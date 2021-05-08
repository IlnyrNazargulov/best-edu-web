<template>
  <CCard>
    <CCardHeader>
      <strong> Запросы на доступ к дисципилине </strong>
    </CCardHeader>
    <CCardBody>
      <strong>Статус заявки </strong>
      <div class="mb-3 mt-2">
        <CButtonGroup>
          <CButton color="secondary" @click.prevent="statusFilter = 'AWAIT'"
            >Ожидающие</CButton
          >
          <CButton color="secondary" @click.prevent="statusFilter = 'ACCEPTED'"
            >Подтвержденные</CButton
          >
          <CButton color="secondary" @click.prevent="statusFilter = 'REJECTED'"
            >Отклоненные</CButton
          >
          <CButton color="secondary" @click.prevent="statusFilter = ''"
            >Все</CButton
          >
        </CButtonGroup>
      </div>
      <CDataTable
        hover
        striped
        :items="accessDisciplines"
        :fields="fields"
        :items-per-page="10"
        clickable-rows
        :active-page="activePage"
        :pagination="{ doubleArrows: false, align: 'center' }"
        @page-change="pageChange"
      >
        <template #student="{item}">
          <td>
            {{ item.student.secondName }} {{ item.student.firstName }}
            {{ item.student.patronymic }}
          </td>
        </template>
        <template #discipline="{item}">
          <td>
            {{ item.discipline.name }}
          </td>
        </template>
        <template #status="{item}">
          <td>
            {{
              item.status == "AWAIT"
                ? "Ожидает"
                : item.status == "ACCEPTED"
                ? "Подтверждено"
                : "Отклонено"
            }}
          </td>
        </template>
        <template #actions="{item}">
          <td>
            <CButton
              class="d-sm-down-none"
              color="success"
              v-show="item.status == 'REJECTED' || item.status == 'AWAIT'"
              @click.prevent="acceptedAccessDiscipline(item)"
              >Подтвердить</CButton
            >
            <CButton
              color="danger"
              v-show="item.status == 'ACCEPTED' || item.status == 'AWAIT'"
              @click.prevent="rejectAccessDiscipline(item)"
              >Отклонить</CButton
            >
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import {
  GET_ALL_DISCIPLINE_ACCESS,
  ACCEPT_DISCIPLINE_ACCESS,
  REJECT_DISCIPLINE_ACCESS,
} from "@/store/actions.type";

export default {
  name: "RequestAccessDiscipline",
  async created() {
    await this.findAccessDiscipline();
  },
  data() {
    return {
      accessDisciplines: [],
      statusFilter: "",
      fields: [
        { key: "student", label: "От кого" },
        { key: "discipline", label: "Дисциплина" },
        { key: "status", label: "Статус" },
        { key: "actions", label: "Действия" },
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
    statusFilter: function() {
      this.findAccessDiscipline();
    },
  },
  methods: {
    async findAccessDiscipline() {
      this.accessDisciplines = await this.$store.dispatch(
        GET_ALL_DISCIPLINE_ACCESS,
        { status: this.statusFilter }
      );
    },
    async acceptedAccessDiscipline(item) {
      item.status = "ACCEPTED";
      await this.$store.dispatch(ACCEPT_DISCIPLINE_ACCESS, {
        disciplineId: item.discipline.id,
        accessDisciplineId: item.id,
      });
    },
    async rejectAccessDiscipline(item) {
      item.status = "REJECTED";
      await this.$store.dispatch(REJECT_DISCIPLINE_ACCESS, {
        disciplineId: item.discipline.id,
        accessDisciplineId: item.id,
      });
    },
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
  },
};
</script>
