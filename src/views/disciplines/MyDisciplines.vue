<template>
  <div>
    <CCard>
      <CCardHeader> Список дисциплин </CCardHeader>
      <CCardBody>
        <CButton color="primary" @click.prevent="createDiscipline">
          <CIcon name="cil-lightbulb" />&nbsp;Создать дисциплину
        </CButton>
        <hr class="d-sm-down-none" />
        <CRow
          ><CCol
            sm="12"
            md="6"
            border-color="primary"
            v-for="(discipline, index) in sortedDisciplines"
            v-bind:key="discipline.id"
          >
            <CCard>
              <CCardHeader
                ><strong v-c-tooltip.hover.click="'Название дисциплины'">{{
                  discipline.name
                }}</strong>
                <CSwitch
                  v-c-tooltip.hover.click="
                    (discipline.isVisible ? 'Отключить' : 'Включить') +
                      ' видимость'
                  "
                  class="float-right"
                  size="sm"
                  shape="pill"
                  color="info"
                  data-on="On"
                  data-off="Off"
                  index="20"
                  :checked="discipline.isVisible"
                  @update:checked="updateDisciline(index)"
              /></CCardHeader>
              <CCardBody
                @click.prevent="clickDisciplineCard(index)"
                v-c-tooltip.hover.click="'Описание дисциплины'"
                >{{ discipline.description }}</CCardBody
              >
            </CCard>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { FIND_MY_DISCIPLINES, UPDATE_DISCIPLINE } from "@/store/actions.type";

export default {
  name: "MyDisciplines",
  data() {
    return {
      disciplines: [],
    };
  },
  components: {},
  created() {
    this.findMyDisciplines();
  },
  methods: {
    async findMyDisciplines() {
      this.disciplines = await this.$store.dispatch(FIND_MY_DISCIPLINES);
    },
    createDiscipline() {
      this.$router.push({ path: "/my-disciplines/new" });
    },
    updateDisciline(index) {
      let discipline = this.sortedDisciplines[index];
      discipline.isVisible = !discipline.isVisible;
      this.$store.dispatch(UPDATE_DISCIPLINE, discipline);
    },
    clickDisciplineCard(index) {
      let discipline = this.sortedDisciplines[index];
      this.$router.push({ path: `/my-disciplines/${discipline.id}` });
    },
  },
  computed: {
    sortedDisciplines() {
      return this.disciplines.sort((a, b) => b.isVisible - a.isVisible);
    },
  },
};
</script>
