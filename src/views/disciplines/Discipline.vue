<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader> {{ discipline.name }} </CCardHeader>
        <CCardBody>
          {{ discipline.description }}
          <hr class="d-sm-down-none" />
          <CButton color="primary" @click="goBack" class="mb-3 mr-3"
            >Вернуться к списку дисциплин</CButton
          >
          <CButton
            v-c-tooltip.hover.click="
              'Для получения доступа к дисциплине запросите доступ'
            "
            v-show="!discipline.isAccess"
            color="primary"
            @click="requestAccess"
            class="mb-3"
            >Запросить доступ</CButton
          >

          <CDataTable
            v-show="discipline.isAccess"
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
  REQUEST_DISCIPLINE_ACCESS,
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
      isAccess: true,
    };
  },
  async created() {
    await this.findDiscipline();
    if (this.discipline.isAccess) {
      await this.findExercisesById();
    }
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
    async requestAccess() {
      this.exercises = await this.$store.dispatch(
        REQUEST_DISCIPLINE_ACCESS,
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
