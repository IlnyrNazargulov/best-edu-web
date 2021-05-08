import {
  GET_CONTENT_FILE,
  FIND_EXERCISE_FILES,
  DELETE_EXERCISE_FILE,
  CREATE_EXERCISE_FILE,
} from "@/store/actions.type";
import { FileService } from "@/utils/files.service";

const actions = {
  async [GET_CONTENT_FILE]({ commit }, url) {
    return await FileService.getContentByUrl(url);
  },
  async [FIND_EXERCISE_FILES]({ commit }, data) {
    return await FileService.getAllByExercise(
      data.disciplineId,
      data.exerciseId
    );
  },
  async [CREATE_EXERCISE_FILE]({ commit }, data) {
    return await FileService.create(
      data.disciplineId,
      data.exerciseId,
      data.exerciseFileType,
      data.data
    );
  },
  async [DELETE_EXERCISE_FILE]({ commit }, data) {
    return await FileService.deleteById(
      data.disciplineId,
      data.exerciseId,
      data.fileId
    );
  },
};

export default {
  actions,
};
