<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader> {{ exercise.name }} </CCardHeader>
        <CCardFooter>
          <CButton color="primary" @click="goBack"
            >Вернуться к списку занятий</CButton
          >
        </CCardFooter>
        <CCardBody></CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { FIND_EXERCISE_BY_ID, GET_CONTENT_FILE } from "@/store/actions.type";
export default {
  name: "Exercise",
  components: {},
  data() {
    return {
      exercise: {},
      content: "ewrwer",
    };
  },
  async created() {
    this.findExercise();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async findExercise() {
      this.exercise = await this.$store.dispatch(FIND_EXERCISE_BY_ID, {
        disciplineId: this.$route.params.disciplineId,
        exerciseId: this.$route.params.exerciseId,
      });
      this.content = await this.$store.dispatch(
        GET_CONTENT_FILE,
        this.exercise.content.file.url
      );
    },
  },
};
</script>
