import {MODEL_TYPES} from "datalayer/modelTypes";
import {GlobalStore} from "business/globalStore";

export const filterNativeModels = (data) => data.type !== MODEL_TYPES.COMBINED && !GlobalStore.has(data);