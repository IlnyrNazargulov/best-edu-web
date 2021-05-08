<template>
  <div>
    <CCard>
      <CCardHeader>Создание дисциплины </CCardHeader>
      <CCardBody>
        <CButtonGroup>
          <CButton
            class="d-sm-down-none"
            color="success"
            @click.prevent="createDiscipline"
            >Создать</CButton
          >
          <CButton color="danger" @click.prevent="goBack">Отмена</CButton>
        </CButtonGroup>
        <hr class="d-sm-down-none" />
        <CForm>
          <CInput
            description="Название должно быть уникально для вашего аккаунта"
            label="Введите название дисциплины"
            horizontal
            v-model="name"
          />
          <CTextarea
            label="Описание дисциплины"
            placeholder="Описание"
            horizontal
            rows="5"
            v-model="description"
          />
          <CRow form class="form-group">
            <CCol tag="label" sm="3" class="col-form-label">
              Доступ по заявке
            </CCol>
            <CCol sm="9">
              <CSwitch
                class="mr-1"
                color="primary"
                :checked="!isPublic"
                @update:checked="isPublic = !isPublic"
              />
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { CREATE_DISCIPLINE } from "@/store/actions.type";

export default {
  name: "CreateDiscipline",
  data() {
    return {
      name: "",
      description: "",
      isPublic: true,
    };
  },
  components: {},
  created() {},
  methods: {
    async createDiscipline() {
      let data = {
        name: this.name,
        description: this.description,
        isPublic: this.isPublic,
      };
      this.disciplines = await this.$store.dispatch(CREATE_DISCIPLINE, data);
      this.$router.go(-1);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
