<template>
  <CCard>
    <CCardHeader>
      <strong> Поиск преподавателя </strong>
    </CCardHeader>
    <CCardBody>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Введите фио преподавателя"
          v-model="teacherNameFilter"
        />
        <div class="input-group-append">
          <CButton color="primary" @click.prevent="findDisciplines">
            Поиск
          </CButton>
        </div>
      </div>
      <CDataTable
        hover
        striped
        :items="teachers"
        :fields="fields"
        :items-per-page="10"
        clickable-rows
        @row-clicked="rowClicked"
        :active-page="activePage"
        :pagination="{ doubleArrows: false, align: 'center' }"
        @page-change="pageChange"
      >
        <template #fullName="{item}">
          <td>
            {{ item.secondName }} {{ item.firstName }}
            {{ item.patronymic }}
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import { FIND_TEACHERS } from "@/store/actions.type";

export default {
  name: "Teachers",
  async created() {
    await this.findTeachers();
  },
  data() {
    return {
      teachers: [],
      teacherNameFilter: "",
      fields: [
        { key: "id", label: "Id" },
        { key: "fullName", label: "ФИО" },
        { key: "countDisciplines", label: "Количество дисциплин" },
      ],
      activePage: 1,
    };
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
  methods: {
    async findTeachers() {
      this.teachers = await this.$store.dispatch(FIND_TEACHERS, {
        fullName: this.teacherNameFilter,
      });
    },
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
    rowClicked(item, index) {
      this.$router.push({
        path: `/profile/${item.id}`,
      });
    },
  },
};
</script>
