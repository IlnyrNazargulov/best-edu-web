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
      fields: [
        { key: "name", label: "Название" },
        { key: "createdAt", label: "Дата создания" },
        { key: "isPublic", label: "Доступна всем" },
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
      this.disciplines = await this.$store.dispatch(
        FIND_DISCIPLINES,
        this.nameFilter
      );
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
