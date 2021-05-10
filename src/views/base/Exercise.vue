<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader> {{ exercise.name }} </CCardHeader>
        <CCardBody>
          <CTabs @update:activeTab="changeActiveTab">
            <CTab title="Материал" active
              ><CButton color="primary" class="mt-3" @click="goBack"
                >Вернуться к списку занятий</CButton
              >
              <hr />
              <div>
                <vue-simplemde
                  v-model="content"
                  :configs="configs"
                  ref="markdownEditor"
                />
              </div>
            </CTab>
            <CTab title="Прикрепленные файлы">
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
  FIND_EXERCISE_BY_ID,
  GET_CONTENT_FILE,
  FIND_EXERCISE_FILES,
} from "@/store/actions.type";
import VueSimplemde from "vue-simplemde";
import { BASE_URL } from "@/utils/config";

export default {
  name: "Exercise",
  components: { VueSimplemde },
  data() {
    return {
      baseUrl: "",
      selectedFileType: "CODE",
      uploadedFile: null,
      exerciseFiles: [],
      fields: [
        { key: "exerciseFileType", label: "Тип" },
        { key: "createdAt", label: "Создан" },
        { key: "name", label: "Наименование" },
        { key: "size", label: "Размер" },
        { key: "url", label: "Ссылка на скачивание" },
      ],
      activePage: 1,
      exercise: {},
      content: "",
      configs: {
        spellChecker: false,
        toolbar: false,
      },
    };
  },
  async created() {
    await this.findExercise();
    setTimeout(() => {
      this.simplemde.togglePreview();
    }, 250);
    this.baseUrl = BASE_URL;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
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
    async findExerciseFiles() {
      this.exerciseFiles = await this.$store.dispatch(FIND_EXERCISE_FILES, {
        disciplineId: this.$route.params.disciplineId,
        exerciseId: this.exercise.id,
      });
    },
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
    changeActiveTab(index) {
      if (index == 1) {
        this.findExerciseFiles();
      }
    },
  },
  computed: {
    simplemde() {
      return this.$refs.markdownEditor.simplemde;
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
  },
};
</script>
<style>
@import "~simplemde/dist/simplemde.min.css";
@import "~github-markdown-css";
</style>
