import Vue from "vue";
import {
  FIND_ALL_EXERCISE_BY_DISCIPLINE_ID,
  FIND_EXERCISE_BY_ID,
} from "@/store/actions.type";
import { ExerciseService } from "@/utils/exercise.service";

const actions = {
  async [FIND_ALL_EXERCISE_BY_DISCIPLINE_ID]({ commit }, disciplineId) {
    return await ExerciseService.getAll(disciplineId);
  },
  async [FIND_EXERCISE_BY_ID]({ commit }, params) {
    return await ExerciseService.getById(
      params.disciplineId,
      params.exerciseId
    );
  },
};

export default {
  actions,
};
