<template>
  <CCard>
    <CCardHeader>
      <strong> Профиль </strong>
    </CCardHeader>
    <CCardBody>
      <CRow>
        <CCol sm="4">
          <CInput
            label="Фамилия"
            v-model="account.secondName"
            placeholder="Введите вашу фамилию"
          />
        </CCol>
        <CCol sm="4">
          <CInput
            label="Имя"
            v-model="account.firstName"
            placeholder="Введите ваше имя"
          />
        </CCol>
        <CCol sm="4">
          <CInput
            label="Отчетство"
            v-model="account.patronymic"
            placeholder="Введите ваше отчество"
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="8">
          <CInput
            label="Дата рождения"
            v-model="account.birthdate"
            type="date"
            horizontal
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="8">
          <CInput
            label="Ученая степень или звание"
            v-model="account.rank"
            horizontal
            placeholder=""
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="8">
          <CTextarea
            v-model="account.information"
            label="Дополнительная информация"
            placeholder="Информация о вас"
            horizontal
            rows="4"
          />
        </CCol>
      </CRow>
    </CCardBody>
    <CCardFooter>
      <div class="d-flex flex-nowrap">
        <CButton
          color="primary"
          class="mr-3"
          @click.prevent="goToDisciplines"
          v-show="!isMyAccount"
          >Список дисциплин</CButton
        >
        <CButton
          color="primary"
          class="mr-3"
          @click.prevent="updateAccount"
          v-show="isMyAccount"
          >Обновить информацию</CButton
        >
        <CButton
          color="primary"
          class="mr-3"
          v-show="isMyAccount"
          @click.prevent="goToChangePassword"
          >Изменить пароль</CButton
        >
        <CButton
          color="danger"
          @click="deleteAcountMoadal = true"
          class="mr-3"
          v-show="isMyAccount"
          >Удалить аккаунт</CButton
        >
      </div>
    </CCardFooter>
    <CModal title="Modal title" color="danger" :show.sync="deleteAcountMoadal">
      Вы действительно хотите удалить аккаунт? После удаления вы попадете на
      страницу логина.
      <template #header>
        <h6 class="modal-title">Подтвердите удаление аккаунта</h6>
        <CButtonClose @click="darkModal = false" class="text-white" />
      </template>
      <template #footer>
        <CButton @click="deleteAcountMoadal = false" color="success"
          >Отмена</CButton
        >
        <CButton @click="deleteAccount" color="danger">Удалить</CButton>
      </template>
    </CModal>
  </CCard>
</template>

<script>
import {
  GET_ACCOUNT,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT,
} from "@/store/actions.type";

export default {
  name: "Profile",
  async created() {},
  data() {
    return {
      deleteAcountMoadal: false,
      account: {},
      paramAccountId: null,
    };
  },
  created() {
    this.paramAccountId = this.$route.params.accountId;
    this.findAccount();
  },
  methods: {
    async findAccount() {
      this.account = await this.$store.dispatch(
        GET_ACCOUNT,
        this.paramAccountId
      );
    },
    async updateAccount() {
      await this.$store.dispatch(UPDATE_ACCOUNT, this.account);
    },
    async deleteAccount() {
      await this.$store.dispatch(DELETE_ACCOUNT);
      this.$router.push({ path: "/pages/login" });
    },
    goToChangePassword() {
      this.$router.push({ path: "/profile/change-password" });
    },
    goToDisciplines() {
      this.$router.push({
        path: "/disciplines/",
        query: { teacherId: this.account.id, teacherName: this.getFullName() },
      });
    },
    getFullName() {
      return (
        this.account.secondName +
        " " +
        this.account.firstName +
        " " +
        this.account.patronymic
      );
    },
  },
  computed: {
    isMyAccount() {
      return (
        this.$store.state.user.account.id == this.paramAccountId ||
        this.paramAccountId == null
      );
    },
  },
};
</script>
