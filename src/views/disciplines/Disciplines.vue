<template>
  <CCard>
    <CCardHeader>
      <CIcon name="cil-justify-center" />
      <strong> Поиск дисциплины </strong>
    </CCardHeader>
    <CCardBody>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Введите название дициплины"
          v-model="nameFilter"
        />
        <div class="input-group-append">
          <CButton color="primary" @click.prevent="findDisciplines">
            Поиск
          </CButton>
        </div>
      </div>
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
        :items="disciplines"
        :fields="fields"
        :items-per-page="10"
        clickable-rows
        :active-page="activePage"
        @row-clicked="rowClicked"
        :pagination="{ doubleArrows: false, align: 'center' }"
        @page-change="pageChange"
      >
        <template #createdAt="{item}">
          <td>
            <p>{{ item.createdAt | formatDate }}</p>
          </td>
        </template>
        <template #teacher="{item}">
          <td>
            {{ item.teacher.secondName }} {{ item.teacher.firstName }}
            {{ item.teacher.patronymic }}
          </td>
        </template>
        <template #isPublic="{item}">
          <td>
            {{ !item.isPublic ? "Да" : "Нет" }}
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import { FIND_DISCIPLINES } from "@/store/actions.type";

export default {
  name: "Disciplines",
  async created() {
    await this.findDisciplines();
  },
  data() {
    return {
      disciplines: [],
      nameFilter: "",
      teacherNameFilter: "",
      fields: [
        { key: "name", label: "Название" },
        { key: "teacher", label: "Преподаватель" },
        { key: "createdAt", label: "Создана" },
        { key: "isPublic", label: "Доступ по заявке" },
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
    async findDisciplines() {
      this.disciplines = await this.$store.dispatch(FIND_DISCIPLINES, {
        nameDiscipline: this.nameFilter,
        teacherFullName: this.teacherNameFilter,
        onlyVisible: true,
      });
    },
    rowClicked(item, index) {
      this.$router.push({ path: `disciplines/${item.id}` });
    },
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
  },
};
</script>
