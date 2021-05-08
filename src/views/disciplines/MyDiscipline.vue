<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          <CRow form class="form-group">
            <input
              type="text"
              class="form-control-plaintext"
              v-model="discipline.name"
            />
            <small class="form-text text-muted w-100"
              >Название должно быть уникально для вашего аккаунта</small
            >
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow form class="form-group">
            <textarea
              type="text"
              class="form-control-plaintext"
              v-model="discipline.description"
              rows="3"
            />
            <small class="form-text text-muted w-100"
              >Описание дисциплины</small
            >
          </CRow>
          <CRow form class="form-group">
            <CCol tag="label" sm="3" class="col-form-label">
              Доступ по заявке
            </CCol>
            <CCol sm="9">
              <CSwitch
                class="mx-1"
                color="primary"
                :checked="!discipline.isPublic"
                @update:checked="discipline.isPublic = !discipline.isPublic"
                variant="opposite"
                v-bind="labelIcon"
              />
            </CCol>
          </CRow>
          <hr class="d-sm-down-none mb-0" />
          <CRow class="row mb-3 justify-content-md-center">
            <CCol
              col="6"
              sm="4"
              md="2"
              xl
              class="text-center mt-3 d-flex align-items-stretch"
            >
              <CButton color="primary" @click.prevent="goBack">
                Вернуться к списку дисциплин
              </CButton>
            </CCol>
            <CCol
              col="6"
              sm="4"
              md="2"
              xl
              class="text-center mt-3 d-flex align-items-stretch"
            >
              <CButton color="primary" @click.prevent="editDiscipline">
                Обновить дисциплину
              </CButton>
            </CCol>
            <CCol
              col="6"
              sm="4"
              md="2"
              xl
              class="text-center mt-3 d-flex align-items-stretch"
            >
              <CButton color="primary" @click.prevent="deleteDiscipline">
                Удалить дисциплину навсегда
              </CButton>
            </CCol>
            <CCol
              col="6"
              sm="4"
              md="2"
              xl
              class="text-center mt-3 d-flex align-items-stretch"
            >
              <CButton color="primary" @click.prevent="addExercise">
                Добавить занятие
              </CButton>
            </CCol>
          </CRow>

          <CDataTable
            hover
            striped
            :items="exercises"
            :sorter="true"
            :fields="fields"
            :items-per-page="10"
            clickable-rows
            :active-page="activePage"
            @row-clicked="rowClicked"
            :pagination="{ doubleArrows: false, align: 'center' }"
            @page-change="pageChange"
          >
            <template #orderNumber="{index}">
              <td>
                {{ index + 1 }}
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import {
  FIND_DISCIPLINE_BY_ID,
  FIND_ALL_EXERCISE_BY_DISCIPLINE_ID,
  UPDATE_DISCIPLINE,
  DELETE_DISCIPLINE,
} from "@/store/actions.type";

export default {
  name: "MyDiscipline",
  data() {
    return {
      discipline: {},
      exercises: [],
      activePage: 1,
      fields: [
        { key: "orderNumber", label: "Номер" },
        { key: "name", label: "Название", _classes: "font-weight-bold" },
        { key: "createdAt", label: "Дата создания" },
      ],
      labelIcon: {
        labelOn: "\u2713",
        labelOff: "\u2715",
      },
    };
  },
  async created() {
    await this.findDiscipline();
    await this.findExercisesById();
  },
  methods: {
    goBack() {
      this.$router.push({
        path: "/my-disciplines/",
      });
    },
    async findDiscipline() {
      this.discipline = await this.$store.dispatch(
        FIND_DISCIPLINE_BY_ID,
        this.$route.params.disciplineId
      );
    },
    async findExercisesById() {
      this.exercises = await this.$store.dispatch(
        FIND_ALL_EXERCISE_BY_DISCIPLINE_ID,
        this.$route.params.disciplineId
      );
    },
    rowClicked(item, index) {
      this.$router.push({
        path: `${this.$route.params.disciplineId}/exercises/${item.id}/`,
      });
    },
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
    editDiscipline() {
      this.$store.dispatch(UPDATE_DISCIPLINE, this.discipline);
    },
    deleteDiscipline() {
      this.discipline.isVisible = true;
      this.$store.dispatch(DELETE_DISCIPLINE, this.discipline.id);
      this.$router.push({ path: "/my-disciplines" });
    },
    addExercise() {
      this.$router.push({
        path: `${this.$route.params.disciplineId}/exercises/`,
        query: { orderNumber: this.exercises.length },
      });
    },
  },
};
</script>
