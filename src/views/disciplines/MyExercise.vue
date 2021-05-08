<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          <input
            type="text"
            class="form-control-plaintext"
            v-model="exercise.name"
          />
          <small class="form-text text-muted w-100"
            >Название должно быть уникально для вашей дисциплины</small
          >
        </CCardHeader>
        <CCardBody>
          <CTabs @update:activeTab="changeActiveTab">
            <CTab title="Материал" active>
              <div class="mt-3">
                <CButton color="primary" class="mr-3" @click="goBack"
                  >Вернуться к списку занятий</CButton
                >
                <div
                  v-show="!isNewExercise"
                  :style="{ display: 'inline-block' }"
                >
                  <CButton
                    color="success"
                    class="mr-3"
                    @click.prevent="createExercise"
                    >Создать занятие</CButton
                  >
                </div>
                <div
                  v-show="isNewExercise"
                  :style="{ display: 'inline-block' }"
                >
                  <CButton
                    color="success"
                    class="mr-3"
                    @click.prevent="updateExercise"
                    >Обновить занятие</CButton
                  >
                  <CButton
                    color="danger"
                    class="mr-3"
                    @click.prevent="deleteExercise"
                    >Удалить занятие</CButton
                  >
                </div>
              </div>
              <hr />
              <div>
                <VueSimplemde
                  preview-class="markdown-body"
                  v-model="content"
                  :configs="configs"
                  ref="markdownEditor"
                />
              </div>
            </CTab>
            <CTab title="Прикрепленные файлы">
              <CForm novalidate>
                <CCardBody>
                  <CInputFile
                    label="Прикрепить файл"
                    horizontal
                    @change="changeInputFile"
                  />
                  <CSelect
                    label="Тип файла"
                    horizontal
                    :options="fileTypes"
                    :value.sync="selectedFileType"
                    placeholder="Выберите тип файла"
                  />
                  <CButton
                    type="submit"
                    color="primary"
                    @click.prevent="createExerciseFile"
                    >Добавить файл</CButton
                  >
                </CCardBody>
              </CForm>
              <strong :style="{ display: 'block' }">Файлы</strong>
              <CDataTable
                hover
                striped
                :items="exerciseFiles"
                :fields="fields"
                :items-per-page="10"
                clickable-rows
                :active-page="activePage"
                :pagination="{ doubleArrows: false, align: 'center' }"
                @page-change="pageChange"
              >
                <template #exerciseFileType="{item}">
                  <td>
                    {{
                      item.exerciseFileType == "DOCUMENT"
                        ? "Документ"
                        : item.exerciseFileType == "CODE"
                        ? "Код"
                        : "Неизвестен"
                    }}
                  </td>
                </template>
                <template #createdAt="{item}">
                  <td>
                    {{ item.file.createdAt | formatDate }}
                  </td>
                </template>
                <template #name="{item}">
                  <td>
                    {{ item.file.name }}
                  </td>
                </template>
                <template #size="{item}">
                  <td>
                    {{ item.file.size }}
                  </td>
                </template>
                <template #url="{item}">
                  <td>
                    <a v-bind:href="baseUrl + item.file.url" target="_blank"
                      >Ссылка на скачивание</a
                    >
                  </td>
                </template>
                <template #actions="{item}">
                  <td>
                    <CButton
                      color="danger"
                      @click.prevent="deleteExerciseFile(item)"
                      >Удалить</CButton
                    >
                  </td>
                </template>
              </CDataTable>
            </CTab>
          </CTabs>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import {
  CREATE_EXERCISE,
  UPDATE_EXERCISE,
  FIND_EXERCISE_BY_ID,
  GET_CONTENT_FILE,
  DELETE_EXERCISE,
  FIND_EXERCISE_FILES,
  CREATE_EXERCISE_FILE,
  DELETE_EXERCISE_FILE,
} from "@/store/actions.type";
import VueSimplemde from "vue-simplemde";
import { BASE_URL } from "@/utils/config";

export default {
  name: "MyExercise",
  components: { VueSimplemde },
  data() {
    return {
      baseUrl: "",
      selectedFileType: "CODE",
      uploadedFile: null,
      fileTypes: [
        {
          value: "CODE",
          label: "Код",
        },
        {
          value: "DOCUMENT",
          label: "Документ",
        },
      ],
      exerciseFiles: [],
      fields: [
        { key: "exerciseFileType", label: "Тип" },
        { key: "createdAt", label: "Создан" },
        { key: "name", label: "Наименование" },
        { key: "size", label: "Размер" },
        { key: "url", label: "Ссылка на скачивание" },
        { key: "actions", label: "Действия" },
      ],
      activePage: 1,
      exercise: { name: "Новое занятие" },
      content: `# Заголовок
#### Пример текста урока`,
      configs: {
        spellChecker: false,
      },
    };
  },
  mounted() {
    this.baseUrl = BASE_URL;
    if (this.isNewExercise) this.findExercise();
  },
  methods: {
    goBack() {
      this.$router.push({
        path: `/my-disciplines/${this.$route.params.disciplineId}`,
      });
    },
    async findExercise() {
      this.exercise = await this.$store.dispatch(FIND_EXERCISE_BY_ID, {
        disciplineId: this.$route.params.disciplineId,
        exerciseId: this.$route.params.exerciseId,
      });
      this.content = await this.$store.dispatch(
        GET_CONTENT_FILE,
        this.exercise.content.file.url
      );
    },
    async createExercise() {
      this.exercise.orderNumber = this.$route.query.orderNumber;
      let exercise = await this.$store.dispatch(CREATE_EXERCISE, {
        disciplineId: this.$route.params.disciplineId,
        exercise: this.exercise,
        content: this.content,
      });
      this.$router.replace(
        `/my-disciplines/${this.$route.params.disciplineId}/exercises/${exercise.id}/`
      );
    },
    async updateExercise() {
      let exercise = await this.$store.dispatch(UPDATE_EXERCISE, {
        disciplineId: this.$route.params.disciplineId,
        exercise: this.exercise,
        content: this.content,
      });
    },
    async deleteExercise() {
      await this.$store.dispatch(DELETE_EXERCISE, {
        disciplineId: this.$route.params.disciplineId,
        exerciseId: this.exercise.id,
      });
      this.$router.push({
        path: `/my-disciplines/${this.$route.params.disciplineId}`,
      });
    },
    changeActiveTab(index) {
      if (index == 1) {
        this.findExerciseFiles();
      }
    },
    async findExerciseFiles() {
      this.exerciseFiles = await this.$store.dispatch(FIND_EXERCISE_FILES, {
        disciplineId: this.$route.params.disciplineId,
        exerciseId: this.exercise.id,
      });
    },
    async createExerciseFile() {
      var bodyFormData = new FormData();
      bodyFormData.append("file", this.uploadedFile);
      await this.$store.dispatch(CREATE_EXERCISE_FILE, {
        disciplineId: this.$route.params.disciplineId,
        exerciseId: this.exercise.id,
        exerciseFileType: this.selectedFileType,
        data: bodyFormData,
      });
      await this.findExerciseFiles();
    },
    async deleteExerciseFile(item) {
      await this.$store.dispatch(DELETE_EXERCISE_FILE, {
        disciplineId: this.$route.params.disciplineId,
        exerciseId: this.exercise.id,
        fileId: item.file.uuid,
      });
      await this.findExerciseFiles();
    },
    changeInputFile(files) {
      this.uploadedFile = files[0];
    },
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
  },
  computed: {
    isNewExercise() {
      if (!!!this.$route.params.exerciseId) return false;
      else return true;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page);
        }
      },
    },
    statusFilter: function() {
      this.findAccessDiscipline();
    },
  },
};
</script>
<style>
@import "~simplemde/dist/simplemde.min.css";
@import "~github-markdown-css";
</style>
