<template>
  <div class="container-fluid w-100">
    <div class="d-flex align-items-center column-gap-2">
      <p class="lead m-0"><i class="bi bi-house-door-fill"></i>Қолдиқ вагонлар</p>
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
          <label for="repairType" class="form-label">Tamirga kelgan turi</label>
          <BFormSelect v-model="formData.repair_type" :options="repairTypes" id="repairType" class="mb-3" >
            <template #first>
              <BFormSelectOption :value="null" disabled>--  Tamirga kelgan turi --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="lastRepairType" class="form-label">Oxirgi tamir turi</label>
          <BFormSelect v-model="formData.last_repair_type" :options="repairTypes" id="lastRepairType" class="mb-3" >
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Oxirgi tamir turi --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="year" class="form-label">Oxirgi tamir vaqti</label>
          <BFormInput v-model="formData.last_repair_year" id="year" placeholder='kun-oy-yill'/>
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
        <div>
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
          <BFormSelect v-model="formData.vagon_type" :options="vagonTypes" id="vagonType" class="mb-3">
            <template #first>
              <BFormSelectOption :value="null" disabled >-- vagon turi --</BFormSelectOption >
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="repairType" class="form-label">Tamirga kelgan turi</label>
          <BFormSelect v-model="formData.repair_type" :options="repairTypes" id="repairType" class="mb-3" >
            <template #first>
              <BFormSelectOption :value="null" disabled>--  Tamirga kelgan turi --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="lastRepairType" class="form-label">Oxirgi tamir turi</label>
          <BFormSelect v-model="formData.last_repair_type" :options="repairTypes" id="lastRepairType" class="mb-3" >
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Oxirgi tamir turi --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="year" class="form-label">Oxirgi tamir vaqti</label>
          <BFormInput v-model="formData.last_repair_year" id="year" placeholder='kun-oy-yill'/>
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
        <div>
          <label for="remainComment" class="form-label">Izoh</label>
          <BFormInput v-model="formData.remain_comment" id="remainComment" class="mb-3" placeholder="Izoh" />
        </div>
      </div>
    </BModal>
    <!-- Modal update -->

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

          <BTableSimple  striped="true" hover="true" bordered="true" class="mt-4">
            <BThead  class="table-dark">
              <BTr class="align-middle">
                <BTh>Vagon Type / Repair Type</BTh>
                <BTh v-for="repairType in repairTypes" :key="repairType.value">
                  {{ repairType.text }}
                </BTh>
              </BTr>
            </BThead>
            <BTbody>
              <BTr  class="align-middle" v-for="vagonType in vagonTypes" :key="vagonType.value">
                <BTd>{{ vagonType.text }}</BTd>
                <BTd v-for="repairType in repairTypes" :key="repairType.value">
                  {{ getCount(vagonType.value, repairType.value) }}
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
                <BTh scope="col">Oxirgi tamir turi</BTh>
                <BTh scope="col">Oxirgi tamir vaqti</BTh>
                <BTh scope="col">Depoga kelgan vaqti</BTh>
                <BTh scope="col">Ta'mir turi</BTh>
                <BTh scope="col">Yili</BTh>
                <BTh scope="col">Firma</BTh>
                <BTh scope="col">Egasi</BTh>
                <BTh scope="col">Izoh</BTh>
                <BTh scope="col" class="d-flex justify-content-center"> Action </BTh>
              </BTr>
            </BThead>
            <BTbody>
              <BTr class="align-middle" v-for="(item, index) in Data" :key="item._id">
                <BTh class="id-tr">{{ index + 1 }}</BTh>
                <BTd>{{ item?.nomer }}</BTd>
                <BTd>{{ item?.vagon_type }}</BTd>
                <BTd>{{ item?.last_repair_type }}</BTd>
                <BTd>{{ item?.last_repair_year }}</BTd>
                <BTd>{{ item?.createdAt }}</BTd>
                <BTd>{{ item?.repair_type}}</BTd>
                <BTd>{{ item?.year }}</BTd>
                <BTd>{{ item?.owner_company_id?.name }}</BTd>
                <BTd>{{ item?.owner_id?.name }}</BTd>
                <BTd>{{ item?.remain_comment }}</BTd>
                <BTd v-if="item?.status =='remain'" class="d-flex justify-content-center">
                  <button @click="getOne(item._id)" class="btn btn-primary m-1">
                    <i class="bi bi-pen-fill"></i>
                  </button>
                  <button @click="getToRepair(item._id)" class="btn btn-success m-1">
                    <i class="bi bi-arrow-up-right-square-fill"></i>
                  </button>
                </BTd>
                <BTd v-else class="d-flex justify-content-center text-red">tamirga olingan</BTd>
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
const Data = ref([]);
let owners = ref([]);
let ownerCompanies = ref([]);
let tableDatas = ref([]);
const summaryData = ref([]);

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

const formData = ref({
  _id: null,
  nomer: null,
  vagon_type: null,
  repair_type: null,
  last_repair_type: null,
  last_repair_year: null,
  owner_id: null,
  owner_company_id: null,
  year: null,
  remain_comment: null,
});

const makeFormNull = () => {
  formData.value._id = null,
  formData.value.nomer = null,
  formData.value.vagon_type = null,
  formData.value.repair_type = null,
  formData.value.owner_id = null,
  formData.value.owner_company_id = null,
  formData.value.year = null,
  formData.value.remain_comment = null
};

const resetFilter = () => {
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
    let res = await axios.get(`/api/vagon/all?vagonType=${encodeURIComponent(selectedVagonType.value)}&repairType=${encodeURIComponent(selectedRepairType.value)}&ownerCompany=${encodeURIComponent(selectedOwnerCompany.value)}&owner=${encodeURIComponent(selectedOwner.value)}`);

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
    const res = await axios.get("/api/vagon/get-vagon-table/remain"); 
    if(res.data) {
      tableDatas.value = res.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getCount = (vagonType, repairType) => {
  const entry = tableDatas.value.find(
    (item) => item.vagon_type === vagonType && item.repair_type === repairType
  );
  return entry ? entry.count : 0;
};

// getToRepair;
let getToRepair = async(id) => {
  try {
    if (!id) return;
    let confirmDelete = confirm("Ta'mirga olishni tasdiqlaysizmi?");
    if (confirmDelete) {
      try {
        let res = await axios.patch("/api/vagon/get-to-repair/" + id);
        alert("Ta'mirga olindi");
        getAll();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Ta'mirga olishda xatolik");
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      userData.value = JSON.parse(storedUserData);
    }
  getAll();
  getVagonTable();
  getAllOwners();
  getAllOwnerCompanys();
});

watch(
  [ selectedVagonType, selectedRepairType, selectedOwnerCompany, selectedOwner],
  async () => {
    if (selectedVagonType.value !== undefined && 
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

.text-red {
    color: red;
}
</style>
