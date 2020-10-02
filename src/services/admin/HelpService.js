import strings from "../../localization";
import { saveAndEditBrand, deleteBrandTypeByID } from "../BrandService";
import { saveAndEditRegion, deleteRegionByID } from "../RegionService";
import { saveAndEditUsage, deleteUsageByID } from "../UsageService";
import { saveAndEditBodyType, deleteBodyTypeByID } from "../BodyType";
import { saveAndEditDrive, deleteDriveTypeByID } from "../DriveService";
import { saveAndEditEmision, deleteEmisionByID } from "../EmisionService";
import { saveAndEditFuel, deleteFuelByID } from "../FuelService";
import { saveAndEditModel, deleteModelByID } from "../ModelService";
import {
  saveAndEditTransmition,
  deleteTransmitionByID
} from "../TransmitionService";

export async function saveData(toggleForms, data, viacleView) {
  let retVal = {};
  switch (toggleForms) {
    case strings.adminBar.brand:
      return saveAndEditBrand(data, viacleView).then(data => {
        return data;
      });
      break;
    case strings.adminBar.region:
      return saveAndEditRegion(data, viacleView).then(data => {
        return data;
      });
      break;
    case strings.adminBar.usage:
      return saveAndEditUsage(data, viacleView).then(data => {
        return data;
      });
      break;
    case strings.adminBar.body:
      return saveAndEditBodyType(data, viacleView).then(data => {
        return data;
      });
      break;
    case strings.adminBar.drive:
      return saveAndEditDrive(data, viacleView).then(data => {
        return data;
      });
      break;
    case strings.adminBar.emition:
      return saveAndEditEmision(data, viacleView).then(data => {
        return data;
      });
      break;
    case strings.adminBar.fuel:
      return saveAndEditFuel(data, viacleView).then(data => {
        return data;
      });
      break;
    case strings.adminBar.model:
      return saveAndEditModel(data, viacleView).then(data => {
        return data;
      });
      break;
    case strings.adminBar.transimtion:
      return saveAndEditTransmition(data, viacleView).then(data => {
        return data;
      });
      break;
  }
  return retVal;
}

export async function deleteData(toggleForms, data, viacleView) {
  let retVal = {};
  switch (toggleForms) {
    case strings.adminBar.brand:
      return deleteBrandTypeByID(data, viacleView).then(data => {
        return data;
      });
      break;
    case strings.adminBar.region:
      return deleteRegionByID(data, viacleView).then(data => {
        return data;
      });
      break;
    case strings.adminBar.usage:
      return deleteUsageByID(data, viacleView).then(data => {
        return data;
      });
      break;
    case strings.adminBar.body:
      return deleteBodyTypeByID(data, viacleView).then(data => {
        return data;
      });
      break;
    case strings.adminBar.drive:
      return deleteDriveTypeByID(data, viacleView).then(data => {
        return data;
      });
      break;
    case strings.adminBar.emition:
      return deleteEmisionByID(data, viacleView).then(data => {
        return data;
      });
      break;
    case strings.adminBar.fuel:
      return deleteFuelByID(data, viacleView).then(data => {
        return data;
      });
      break;
    case strings.adminBar.model:
      return deleteModelByID(data, viacleView).then(data => {
        return data;
      });
      break;
    case strings.adminBar.transimtion:
      return deleteTransmitionByID(data, viacleView).then(data => {
        return data;
      });
      break;
  }
  return retVal;
}
