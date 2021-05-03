<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader> {{ discipline.name }} </CCardHeader>
        <CCardBody>
          {{ discipline.description }}
        </CCardBody>
        <CCardFooter>
          <CButton color="primary" @click="goBack"
            >Вернуться к списку дисциплин</CButton
          >
        </CCardFooter>
        <CCardBody>
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
} from "@/store/actions.type";

export default {
  name: "Discipline",
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
    };
  },
  async created() {
    await this.findDiscipline();
    await this.findExercisesById();
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/disciplines" });
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
  },
};
</script>
