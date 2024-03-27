<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center column-gap-2">
      <p class="lead m-0"><i class="bi bi-house-door-fill"></i>Qoldiq Vagonlar</p>
    </div>

    <!-- Modal create -->
    <BModal
      class="modal-xl"
      v-model="modalCreate"
      @ok.prevent="handleOk"
      @keyup.enter="handleOk"
      @cancel="modalCreate = !modalCreate"
      cancelTitle="Chiqish"
      okTitle="Saqlash"
    >
      <div class="row">
        <div class="col-6">
          <label for="nomer" class="form-label">Vagon nomeri</label>
          <BFormInput v-model="formData.nomer" id="nomer" class="mb-3" />
        </div>
        <div class="col-6">
          <label for="year" class="form-label">Ishlab chiqarilgan yili</label>
          <BFormInput v-model="formData.year" id="year" />
        </div>
        <div class="col-6">
          <label for="vagonType" class="form-label">Vagon turi</label>
          <BFormSelect v-model="formData.vagon_type" :options="vagonTypes" id="vagonType" class="mb-3">
            <template #first>
              <BFormSelectOption :value="null" disabled >-- vagon turi --</BFormSelectOption >
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="repairType" class="form-label">Tamir Turi</label>
          <BFormSelect v-model="formData.repair_type" :options="repairTypes" id="repairType" class="mb-3" >
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Tamir turi --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="depo" class="form-label">Depo</label>
          <BFormSelect v-model="formData.depo" :options="depos" id="depo" class="mb-3">
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Depo --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="ownerCompanies" class="form-label">Firma egasi</label>
          <BFormSelect v-model="formData.owner_company_id" :options="ownerCompanies" id="ownerCompanies"  class="mb-3" >
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Firma egasi --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="owner" class="form-label">Egasi</label>
          <BFormSelect v-model="formData.owner_id" :options="owners" id="owner" class="mb-3" >
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Egasi --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="remainComment" class="form-label">Izoh</label>
          <BFormInput v-model="formData.remain_comment" id="remainComment" class="mb-3" placeholder="Izoh" />
        </div>
      </div>
    </BModal>
    <!-- Modal create -->

    <!-- Modal update -->
    <BModal
      class="modal-xl"
      v-model="modalUpdate"
      @ok.prevent="handleUpdate"
      @keyup.enter="handleUpdate"
      @cancel="modalUpdate = !modalUpdate"
      cancelTitle="Chiqish"
      okTitle="Saqlash"
    >
      <div class="row">
        <div class="col-6">
          <label for="nomer" class="form-label">Vagon nomeri</label>
          <BFormInput v-model="formData.nomer" id="nomer" class="mb-3" />
        </div>
        <div class="col-6">
          <label for="year" class="form-label">Ishlab chiqarilgan yili</label>
          <BFormInput v-model="formData.year" id="year" />
        </div>
        <div class="col-6">
          <label for="vagonType" class="form-label">Vagon turi</label>
          <BFormSelect v-model="formData.vagon_type" :options="vagonTypes" id="vagonType" class="mb-3" >
            <template #first>
              <BFormSelectOption :value="null" disabled >-- vagon turi --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="repairType" class="form-label">Tamir Turi</label>
          <BFormSelect v-model="formData.repair_type" :options="repairTypes" id="repairType" class="mb-3" >
            <template #first>
              <BFormSelectOption :value="null" disabled >-- Tamir turi --</BFormSelectOption >
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="depo" class="form-label">Depo</label>
          <BFormSelect v-model="formData.depo" :options="depos" id="depo" class="mb-3">
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Depo --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="ownerCompanies" class="form-label">Firma egasi</label>
          <BFormSelect v-model="formData.owner_company_id" :options="ownerCompanies" id="ownerCompanies" class="mb-3">
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Firma egasi --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="owner" class="form-label">Egasi</label>
          <BFormSelect v-model="formData.owner_id"  :options="owners" id="owner" class="mb-3">
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Egasi --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="remainComment" class="form-label">Izoh</label>
          <BFormInput v-model="formData.remain_comment"  id="remainComment" class="mb-3" placeholder="Izoh" />
        </div>
      </div>
    </BModal>
    <!-- Modal update -->

    <!-- Modal Repair -->
    <BModal
      v-model="modalInputData"
      @ok.prevent="handleInputData"
      @keyup.enter="handleInputData"
      @cancel="modalInputData = !modalInputData"
      cancelTitle="Chiqish"
      okTitle="Saqlash"
      size="xl"
      scrollable
    >
      <div class="container bg-yellow d-flex justify-content-center text-black">
        <h5>Yon ramalari (bak.ram)</h5>
      </div>
      <div class="row">
        <div class="col">
          <label for="ramaRight1Year" class="form-label">1-o'ng yon ramasi</label>
          <BFormInput
            v-model="inputData.ramaRight1Year"
            id="ramaRight1Year"
            class="mb-3"
            placeholder="ishlab chiqarilgan yili"
          />
          <BFormInput
            v-model="inputData.ramaRight1Number"
            id="ramaRight1Number"
            class="mb-3"
            placeholder="nameri"
          />
        </div>
        <div class="col">
          <label for="ramaRight2Year" class="form-label">2-o'ng yon ramasi</label>
          <BFormInput
            v-model="inputData.ramaRight2Year"
            id="ramaRight2Year"
            class="mb-3"
            placeholder="ishlab chiqarilgan yili"
          />
          <BFormInput
            v-model="inputData.ramaRight2Number"
            id="ramaRight2Number"
            class="mb-3"
            placeholder="nameri"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="ramaLeft1Year" class="form-label">1-chap yon ramasi</label>
          <BFormInput
            v-model="inputData.ramaLeft1Year"
            id="ramaLeft1Year"
            class="mb-3"
            placeholder="ishlab chiqarilgan yili"
          />
          <BFormInput
            v-model="inputData.ramaLeft1Number"
            id="ramaLeft1Number"
            class="mb-3"
            placeholder="nameri"
          />
        </div>
        <div class="col-6">
          <label for="ramaLeft2Year" class="form-label">2-chap yon ramasi</label>
          <BFormInput
            v-model="inputData.ramaLeft2Year"
            id="ramaLeft2Year"
            class="mb-3"
            placeholder="ishlab chiqarilgan yili"
          />
          <BFormInput
            v-model="inputData.ramaLeft2Number"
            id="ramaLeft2Number"
            class="mb-3"
            placeholder="nameri"
          />
        </div>
      </div>
      <div class="container bg-yellow d-flex justify-content-center text-black">
        <h5>Ressor usti balkasi</h5>
      </div>
      <div class="row">
        <div class="col">
          <label for="balka1Year" class="form-label">1-balka</label>
          <BFormInput
            v-model="inputData.balka1Year"
            id="balka1Year"
            class="mb-3"
            placeholder="ishlab chiqarilgan yili"
          />
          <BFormInput
            v-model="inputData.balka1Number"
            id="balka1Number"
            class="mb-3"
            placeholder="nameri"
          />
        </div>
        <div class="col">
          <label for="balka2Year" class="form-label">2-balka</label>
          <BFormInput
            v-model="inputData.balka2Year"
            id="balka2Year"
            class="mb-3"
            placeholder="ishlab chiqarilgan yili"
          />
          <BFormInput
            v-model="inputData.balka2Number"
            id="balka2Number"
            class="mb-3"
            placeholder="nameri"
          />
        </div>
      </div>
      <div class="container bg-yellow d-flex justify-content-center text-black">
        <h5>G'ildirak juftligi</h5>
      </div>
      <div class="row">
        <div class="col">
          <label for="gildirak1" class="form-label">Gildirak 1</label>
          <BFormInput
            v-model="inputData.gildirak1"
            id="gildirak1"
            class="mb-3"
            placeholder="tegishliligi (27,29)"
          />
          <BFormInput
            v-model="inputData.gildirak1Number"
            id="gildirak1Number"
            class="mb-3"
            placeholder="nomeri (123456)"
          />
        </div>
        <div class="col">
          <label for="gildirak2" class="form-label">Gildirak 2</label>
          <BFormInput
            v-model="inputData.gildirak2"
            id="gildirak2"
            class="mb-3"
            placeholder="tegishliligi (27,29)"
          />
          <BFormInput
            v-model="inputData.gildirak2Number"
            id="gildirak2Number"
            class="mb-3"
            placeholder="nomeri (123456)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="gildirak3" class="form-label">Gildirak 3</label>
          <BFormInput
            v-model="inputData.gildirak3"
            id="gildirak3"
            class="mb-3"
            placeholder="tegishliligi (27,29)"
          />
          <BFormInput
            v-model="inputData.gildirak3Number"
            id="gildirak3Number"
            class="mb-3"
            placeholder="nomeri (123456)"
          />
        </div>
        <div class="col">
          <label for="gildirak4" class="form-label">Gildirak 4</label>
          <BFormInput
            v-model="inputData.gildirak4"
            id="gildirak4"
            class="mb-3"
            placeholder="tegishliligi (27,29)"
          />
          <BFormInput
            v-model="inputData.gildirak4Number"
            id="gildirak4Number"
            class="mb-3"
            placeholder="nomeri (123456)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="inputComment" class="form-label">Izoh</label>
          <BFormInput
            v-model="inputData.input_comment"
            id="inputComment"
            class="mb-3"
            placeholder="izoh"
          />
        </div>
      </div>
    </BModal>
    <!-- Modal Repair -->

    <!-- Filter -->
    <div class="row mt-5">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-body ">
            <div class="row gy-3">
              <button
                class="btn btn-success d-flex align-items-center justify-content-center fs-6 m-3 col" 
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                @click="modalCreate = !modalCreate"
              >
                <i class="bi bi-plus-circle me-2"></i>
                <span>Vagon qo'shish</span>
              </button>
              <div class="col">
                <BFormSelect v-model="selectedDepo" :options="depos" class="mb-3">
                  <template #first>
                    <BFormSelectOption :value="null" disabled>-- Depo --</BFormSelectOption>
                  </template>
                </BFormSelect>
              </div>
              <div class="col">
                <BFormSelect  v-model="selectedVagonType" :options="vagonTypes" class="mb-3" >
                  <template #first>
                    <BFormSelectOption :value="null" disabled >-- vagon turi --</BFormSelectOption >
                  </template>
                </BFormSelect>
              </div>
              <div class="col">
                <BFormSelect  v-model="selectedRepairType" :options="repairTypes" class="mb-3" >
                  <template #first>
                    <BFormSelectOption :value="null" disabled >-- Tamir --</BFormSelectOption>
                  </template>
                </BFormSelect>
              </div>
              <div class="col">
                <BFormSelect v-model="selectedOwnerCompany" :options="ownerCompanies" class="mb-3" >
                  <template #first>
                    <BFormSelectOption :value="null" disabled >-- Firma --</BFormSelectOption >
                  </template>
                </BFormSelect>
              </div>
              <div class="col">
                <BFormSelect v-model="selectedOwner" :options="owners" class="mb-3" >
                  <template #first>
                    <BFormSelectOption :value="null" disabled >-- Egasi --</BFormSelectOption >
                  </template>
                </BFormSelect>
              </div>
              <div class="col">
                <button class="mx-auto btn btn-info w-100" @click="resetFilter()">
                  <i class="bi bi-x-circle me-2"></i>
                  <span>Tozalash</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="mt-5">
      <div class="card shadow-sm" style="overflow: auto; white-space: nowrap">
        <div class="card-body">
          <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
            <BTbody>
              <BTr v-for="(row, rowIndex) in tableDatas" :key="rowIndex">
                <BTd>{{ row[0] }}</BTd>
                <BTd v-for="(count, columnIndex) in row.slice(1)" :key="columnIndex">
                  {{ count }}
                </BTd>
              </BTr>
            </BTbody>
          </BTableSimple>
        </div>
      </div>
    </div>

    <!-- List -->
    <div class="mt-5">
      <div class="card shadow-sm" style="overflow: auto; white-space: nowrap">
        <div class="card-body">
          <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
            <BThead class="table-dark">
              <BTr class="align-middle">
                <BTh scope="col">№</BTh>
                <BTh scope="col">Nomeri</BTh>
                <BTh scope="col">Vagon turi</BTh>
                <BTh scope="col">Ta'mir turi</BTh>
                <BTh scope="col">Firma</BTh>
                <BTh scope="col">Egasi</BTh>
                <BTh scope="col">Yili</BTh>
                <BTh scope="col">VCHD</BTh>
                <BTh scope="col">Depoga kelgan vaqti</BTh>
                <BTh scope="col">Izoh</BTh>
                <BTh scope="col" class="d-flex justify-content-center"> Action </BTh>
              </BTr>
            </BThead>
            <BTbody>
              <BTr class="align-middle" v-for="(item, index) in Data" :key="item._id">
                <BTh class="id-tr">{{ index + 1 }}</BTh>
                <BTd>{{ item?.nomer }}</BTd>
                <BTd>{{ item?.vagon_type }}</BTd>
                <BTd>{{ item?.repair_type}}</BTd>
                <BTd>{{ item?.owner_company_id?.name }}</BTd>
                <BTd>{{ item?.owner_id?.name }}</BTd>
                <BTd>{{ item?.year }}</BTd>
                <BTd>{{ item?.depo }}</BTd>
                <BTd>{{ item?.createdAt }}</BTd>
                <BTd>{{ item?.remain_comment }}</BTd>
                <BTd class="d-flex justify-content-center">
                  <button @click="getOne(item._id)" class="btn btn-primary m-1">
                    <i class="bi bi-pen-fill"></i>
                  </button>
                  <button @click="addInputData(item._id)" class="btn btn-success m-1">
                    <i class="bi bi-arrow-up-right-square-fill"></i>
                  </button>
                  <!-- <button @click="deleteItem(item._id)" class="btn btn-danger m-0">
                    <i class="bi bi-trash-fill"></i>
                  </button> -->
                </BTd>
              </BTr>
            </BTbody>
          </BTableSimple>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const userData = ref({});

const modalCreate = ref(false);
const modalUpdate = ref(false);
const modalInputData = ref(false);
const Data = ref([]);
let owners = ref([]);
let ownerCompanies = ref([]);
let tableDatas = ref([]);
let selectedDepo = ref('');
let selectedVagonType = ref('');
let selectedRepairType = ref('');
let selectedOwnerCompany = ref('');
let selectedOwner = ref('');

let vagonTypes = ref([
  {value: 'Yopiq vagon (крыт)', text: 'Yopiq vagon (крыт)'},
  {value: 'Platforma (пф)', text: 'Platforma (пф)'},
  {value: 'Yarim ochiq vagon (пв)', text: 'Yarim ochiq vagon (пв)'},
  {value: 'Sisterna (цс)', text: 'Sisterna (цс)'},
  {value: 'Boshqa turdagi (проч)', text: 'Boshqa turdagi (проч)'},
]);

let repairTypes = ref([
  {value: 'Depoli ta\'mir (ДР)', text: 'Depoli ta\'mir (ДР)'},
  {value: 'Kapital ta\'mir (КР)', text: 'Kapital ta\'mir (КР)'},
  {value: 'KPR (КРП)', text: 'KPR (КРП)'},
  {value: 'TO-3', text: 'TO-3'},
]);

let depos = ref([
  {value: 'VCHD-3', text: 'VCHD-3'},
  {value: 'VCHD-5', text: 'VCHD-5'},
  {value: 'VCHD-6', text: 'VCHD-6'},
]);

const formData = ref({
  _id: null,
  nomer: null,
  vagon_type: null,
  repair_type: null,
  owner_id: null,
  owner_company_id: null,
  year: null,
  depo: null,
  remain_comment: null,
});

const inputData = ref({
  vagon_id: null,

  ramaRight1Year: null,
  ramaRight1Number: null,

  ramaRight2Year: null,
  ramaRight2Number: null,

  ramaLeft1Year: null,
  ramaLeft1Number: null,

  ramaLeft2Year: null,
  ramaLeft2Number: null,

  balka1Year: null,
  balka1Number: null,

  balka2Year: null,
  balka2Number: null,

  gildirak1: null,
  gildirak1Number: null,

  gildirak2: null,
  gildirak2Number: null,

  gildirak3: null,
  gildirak3Number: null,

  gildirak4: null,
  gildirak4Number: null,

  input_comment: null,
});

const makeFormNull = () => {
  formData.value._id = null,
  formData.value.nomer = null,
  formData.value.vagon_type = null,
  formData.value.repair_type = null,
  formData.value.owner_id = null,
  formData.value.owner_company_id = null,
  formData.value.year = null,
  formData.value.depo = null,
  formData.value.remain_comment = null
};

const resetFilter = () => {
  selectedDepo.value = userData.value.depo,
  selectedVagonType.value = '',
  selectedRepairType.value = '',
  selectedOwnerCompany.value = '',
  selectedOwner.value = ''
  getAll();
}

//create
const handleOk = async () => {
  try {
    alert("Saqlamoqchi");
    let res = await axios.post("/api/vagon/create", formData.value);
    if (res.data) {
      modalCreate.value = !modalCreate.value;
      makeFormNull();
      getAll();
      getVagonTable()
    }
  } catch (error) {
    console.error(error);
  }
};

//delete
const deleteItem = async (id) => {
  try {
    if (!id) return;
    let confirmDelete = confirm("Tasdiqlaysizmi?");
    if (confirmDelete) {
      try {
        let res = await axios.delete("/api/vagon/delete/" + id);
        alert("Ma'lumot o'chirildi");
        getAll();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Delete cancelled");
    }
  } catch (error) {
    console.error(error);
  }
};


// Define the formatDate function
function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'UTC'
  };

  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
}

//getAllVagon
let getAll = async () => {
  try {
    let res = await axios.get(`/api/vagon/all?depo=${encodeURIComponent(selectedDepo.value)}&vagonType=${encodeURIComponent(selectedVagonType.value)}&repairType=${encodeURIComponent(selectedRepairType.value)}&ownerCompany=${encodeURIComponent(selectedOwnerCompany.value)}&owner=${encodeURIComponent(selectedOwner.value)}`);

    if (res.data) { 
      Data.value = res.data.map(item => {
        item.createdAt = formatDate(item.createdAt);
        item.updatedAt = formatDate(item.updatedAt);
        return item;   
      });
    }

  } catch (error) {
    console.error(error);
  }
};


// getOne;
let getOne = async (id) => {
  try {
    let res = await axios.get("/api/vagon/one/" + id);
    if (res.data) {
      formData.value = res.data;
      modalUpdate.value = !modalUpdate.value;
    }
  } catch (error) {
    console.error(error);
  }
};

// update
const handleUpdate = async () => {
  let id = formData.value._id;
  try {
    let res = await axios.patch("/api/vagon/update/" + id, formData.value);
    if (res) {
      getAll();
      getVagonTable()
      modalUpdate.value = !modalUpdate.value;
      makeFormNull();
    }
  } catch (error) {
    console.error(error);
  }
};


//getAllOwners
let getAllOwners = async () => {
  try {
    let res = await axios.get("/api/owner/all");
    if (res.data) {
      owners.value = res.data.map(function (item) {
        return { text: item.name, value: item._id };
      });
    }
  } catch (error) {
    console.error(error);
  }
};

//getAllOwnerCompanys
let getAllOwnerCompanys = async () => {
  try {
    let res = await axios.get("/api/owner-company/all");
    if (res.data) {
      ownerCompanies.value = res.data.map(function (item) {
        return { text: item.name, value: item._id };
      });
    }
  } catch (error) {
    console.error(error);
  }
};

//getVagonTable
let getVagonTable = async () => {
  try {
    const res = await axios.get("/api/vagon/get-vagon-table/remain"); // Replace with your API endpoint

    tableDatas.value = res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// addInputData;
let addInputData = async (id) => {
  inputData.value.vagon_id = id;
  modalInputData.value = !modalInputData.value;
};

const makeInputDataNull = () => {
  inputData.value.vagon_id = null;

  inputData.value.ramaRight1Year = null;
  inputData.value.ramaRight1Number = null;

  inputData.value.ramaRight2Year = null;
  inputData.value.ramaRight2Number = null;

  inputData.value.ramaLeft1Year = null;
  inputData.value.ramaLeft1Number = null;

  inputData.value.ramaLeft2Year = null;
  inputData.value.ramaLeft2Number = null;

  inputData.value.balka1Year = null;
  inputData.value.balka1Number = null;

  inputData.value.balka2Year = null;
  inputData.value.balka2Number = null;

  inputData.value.gildirak1 = null;
  inputData.value.gildirak1Number = null;

  inputData.value.gildirak2 = null;
  inputData.value.gildirak2Number = null;

  inputData.value.gildirak3 = null;
  inputData.value.gildirak3Number = null;

  inputData.value.gildirak4 = null;
  inputData.value.gildirak4Number = null;

  inputData.value.input_comment = null;
};

//Create Input Data
const handleInputData = async () => {
  try {
    alert("Saqlamoqchi");
    let res = await axios.post("/api/vagon-input-data/create", inputData.value);
    if (res.data) {
      modalInputData.value = !modalInputData.value;
      makeInputDataNull();
      router.push({ path: "/api/vagon/repairing-vagons" });
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      userData.value = JSON.parse(storedUserData);
      selectedDepo.value = userData.value.depo
    }
  getAll();
  getVagonTable();
  getAllOwners();
  getAllOwnerCompanys();
});

watch(
  [selectedDepo, selectedVagonType, selectedRepairType, selectedOwnerCompany, selectedOwner],
  async () => {
    if (selectedDepo.value !== undefined && selectedVagonType.value !== undefined && 
        selectedRepairType.value !== undefined && selectedOwnerCompany.value !== undefined &&
        selectedOwner.value !== undefined) {
      getAll();
    }
  },
  { deep: true }
);


</script>

<style lang="scss" scoped>
.id-tr {
  width: 23px;
  text-align: center;
}

.btns {
  width: 70px;
  text-align: center;
}

</style>
