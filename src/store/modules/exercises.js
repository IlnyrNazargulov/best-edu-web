import {
  FIND_ALL_EXERCISE_BY_DISCIPLINE_ID,
  FIND_EXERCISE_BY_ID,
  CREATE_EXERCISE,
  UPDATE_EXERCISE,
  DELETE_EXERCISE,
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
  async [CREATE_EXERCISE]({ commit }, data) {
    let exercise = await ExerciseService.create(
      data.disciplineId,
      data.exercise
    );
    await ExerciseService.updateContent(
      data.disciplineId,
      exercise.id,
      data.content
    );
    return exercise;
  },
  async [UPDATE_EXERCISE]({ commit }, data) {
    let exercise = await ExerciseService.update(
      data.disciplineId,
      data.exercise.id,
      data.exercise
    );
    await ExerciseService.updateContent(
      data.disciplineId,
      exercise.id,
      data.content
    );
    return exercise;
  },
  async [DELETE_EXERCISE]({ commit }, data) {
    let exercise = await ExerciseService.deleteById(
      data.disciplineId,
      data.exerciseId
    );
    return exercise;
  },
};

export default {
  actions,
};
