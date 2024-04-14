<template>
  <div class="container-fluid w-100">
    <div class="d-flex align-items-center column-gap-2">
      <p class="lead m-0"><i class="bi bi-house-door-fill"></i>Ta'mirlangan vagonlar</p>
    </div>

    <!-- Modal Repair update -->
    <BModal
      v-model="modalOutputDataUpdate"
      @ok.prevent="updateInputData"
      @keyup.enter="updateInputData"
      @cancel="modalOutputDataUpdate = !modalOutputDataUpdate"
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
            v-model="outputData.ramaRight1Year"
            id="ramaRight1Year"
            class="mb-3"
            placeholder="ishlab chiqarilgan yili"
          />
          <BFormInput
            v-model="outputData.ramaRight1Number"
            id="ramaRight1Number"
            class="mb-3"
            placeholder="nameri"
          />
        </div>
        <div class="col">
          <label for="ramaRight2Year" class="form-label">2-o'ng yon ramasi</label>
          <BFormInput
            v-model="outputData.ramaRight2Year"
            id="ramaRight2Year"
            class="mb-3"
            placeholder="ishlab chiqarilgan yili"
          />
          <BFormInput
            v-model="outputData.ramaRight2Number"
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
            v-model="outputData.ramaLeft1Year"
            id="ramaLeft1Year"
            class="mb-3"
            placeholder="ishlab chiqarilgan yili"
          />
          <BFormInput
            v-model="outputData.ramaLeft1Number"
            id="ramaLeft1Number"
            class="mb-3"
            placeholder="nameri"
          />
        </div>
        <div class="col-6">
          <label for="ramaLeft2Year" class="form-label">2-chap yon ramasi</label>
          <BFormInput
            v-model="outputData.ramaLeft2Year"
            id="ramaLeft2Year"
            class="mb-3"
            placeholder="ishlab chiqarilgan yili"
          />
          <BFormInput
            v-model="outputData.ramaLeft2Number"
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
            v-model="outputData.balka1Year"
            id="balka1Year"
            class="mb-3"
            placeholder="ishlab chiqarilgan yili"
          />
          <BFormInput
            v-model="outputData.balka1Number"
            id="balka1Number"
            class="mb-3"
            placeholder="nameri"
          />
        </div>
        <div class="col">
          <label for="balka2Year" class="form-label">2-balka</label>
          <BFormInput
            v-model="outputData.balka2Year"
            id="balka2Year"
            class="mb-3"
            placeholder="ishlab chiqarilgan yili"
          />
          <BFormInput
            v-model="outputData.balka2Number"
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
            v-model="outputData.gildirak1"
            id="gildirak1"
            class="mb-3"
            placeholder="tegishliligi (27,29)"
          />
          <BFormInput
            v-model="outputData.gildirak1Number"
            id="gildirak1Number"
            class="mb-3"
            placeholder="nomeri (123456)"
          />
        </div>
        <div class="col">
          <label for="gildirak2" class="form-label">Gildirak 2</label>
          <BFormInput
            v-model="outputData.gildirak2"
            id="gildirak2"
            class="mb-3"
            placeholder="tegishliligi (27,29)"
          />
          <BFormInput
            v-model="outputData.gildirak2Number"
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
            v-model="outputData.gildirak3"
            id="gildirak3"
            class="mb-3"
            placeholder="tegishliligi (27,29)"
          />
          <BFormInput
            v-model="outputData.gildirak3Number"
            id="gildirak3Number"
            class="mb-3"
            placeholder="nomeri (123456)"
          />
        </div>
        <div class="col">
          <label for="gildirak4" class="form-label">Gildirak 4</label>
          <BFormInput
            v-model="outputData.gildirak4"
            id="gildirak4"
            class="mb-3"
            placeholder="tegishliligi (27,29)"
          />
          <BFormInput
            v-model="outputData.gildirak4Number"
            id="gildirak4Number"
            class="mb-3"
            placeholder="nomeri (123456)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="outputComment" class="form-label">Izoh</label>
          <BFormInput
            v-model="outputData.output_comment"
            id="outputComment"
            class="mb-3"
            placeholder="izoh"
          />
        </div>
      </div>
    </BModal>
    <!-- Modal Repair -->

    <div
        class="card shadow-sm container"
        v-if="userData.role =='Admin'"
      >
      <div class="card-header" >
        <ul class="nav nav-pills card-header-pills d-flex justify-content-center">
          <li class="nav-item" v-for="item in depos" :key="item.value">
            <a class="nav-link" @click="selectDepo(item.value)">{{ item.text }}</a>
          </li>
        </ul>
      </div>
    </div>
    


    <!-- Table DR -->
    <div class="mt-2">
      <div class="card shadow-s container bg-yellow d-flex justify-content-center text-black" style="overflow: auto; white-space: nowrap">
        <div class="card-header ">
          <h5>Depo ta'mir(ДР)</h5>
        </div>
        <div class="card-body">
          <BTableSimple striped="true" hover="true" bordered="true" class="">
            <BTbody>
              <BTr v-for="(row, rowIndex) in tableDatasDr" :key="rowIndex">
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
    
    <!--Kr Table -->
    <div class="mt-2">
      <div class="card shadow-s container bg-yellow d-flex justify-content-center text-black" style="overflow: auto; white-space: nowrap">
        <div class="card-header ">
          <h5>Kapital ta'mir(КР)</h5>
        </div>
        <div class="card-body">
          <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
            <BTbody>
              <BTr v-for="(row, rowIndex) in tableDatasKr" :key="rowIndex">
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

    <!--Krp Table -->
    <div class="mt-2">
      <div class="card shadow-s container bg-yellow d-flex justify-content-center text-black" style="overflow: auto; white-space: nowrap">
        <div class="card-header ">
          <h5>KRP(КРП)</h5>
        </div>
        <div class="card-body">
          <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
            <BTbody>
              <BTr v-for="(row, rowIndex) in tableDatasKrp" :key="rowIndex">
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

    <!--To3 Table -->
    <div class="mt-2">
      <div class="card shadow-s container bg-yellow d-flex justify-content-center text-black" style="overflow: auto; white-space: nowrap">
        <div class="card-header ">
          <h5>To 3</h5>
        </div>
        <div class="card-body">
          <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
            <BTbody>
              <BTr v-for="(row, rowIndex) in tableDatasTo3" :key="rowIndex">
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
    <div class="mt-5 row">
      <div
        class="card shadow-sm"
        style="overflow: auto; white-space: nowrap; height: 100vh"
      >
        <div class="card-body table-responsive">
          <div class="align-middle row">
            <!-- Inner Card -->
            
            <div
              class="card shadow-sm m-3 col-12"
              style="overflow: auto; white-space: nowrap"
              v-for="item in Data"
              :key="item._id"
            >
            <div class="card-header">
                <div class="row align-items-center ">
                  <div class="col-2">
                    <h5><span class="text-muted">Nomeri: </span>{{ item.nomer }}</h5>
                  </div>
                  <div class="col-3">
                    <h5><span class="text-muted">Vagon turi: </span>{{ item.vagon_type }}</h5>
                  </div>
                  <div class="col-3">
                    <h5><span class="text-muted">Ta'mir turi: </span>{{ item.repair_type }}</h5>
                  </div>
                  <div class="col-2">
                    <h5><span class="text-muted">Depo: </span>{{ item.depo }}</h5>
                  </div>
                  <!-- <div class="col-2 ">
                    <button @click="getOne(item.input_data_id?._id)" class="btn btn-primary me-2">
                      <i class="bi bi-pen-fill"></i> Edit
                    </button>
                    <button @click="addOutputData(item?._id)" class="btn btn-success">
                      <i class="bi bi-arrow-up-right-square-fill"></i> Output
                    </button>
                  </div> -->
                </div>
                <hr class="my-2">
                <div class="row justify-content-between">
                  <div class="col">
                    <p>Depoga kelgan vaqti: {{ item.createdAt }}</p>
                  </div>
                  <div class="col">
                    <p>Tamirga olingan vaqti: {{ item.input_data_id.createdAt }}</p>
                  </div>
                  <div class="col">
                    <p>Tamirdan chiqqan vaqti: {{ item.output_data_id.createdAt }}</p>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <!-- Yon ramalari -->
                <div>
                  <div class="row justify-content-between">
                    <h6 class="card-title offset-1 col-4">Yon ramalari</h6>
                    <h6 class="card-title col-3">Balkalar</h6>
                    <h6 class="card-title col">G'ildiraklar</h6>
                  </div>
                  <div class="row">
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">Nomi</h6>
                      <p class="card-text my-0">Yili</p>
                      <p class="card-text my-0">Nomeri</p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">1-o'ng</h6>
                      <p class="card-text my-0">
                        {{ item.input_data_id?.ramaRight1Year }}
                      </p>
                      <p class="card-text my-0">
                        {{ item.input_data_id?.ramaRight1Number }}
                      </p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">2-o'ng</h6>
                      <p class="card-text my-0">
                        {{ item.input_data_id?.ramaRight2Year }}
                      </p>
                      <p class="card-text my-0">
                        {{ item.input_data_id?.ramaRight2Number }}
                      </p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">1-chap</h6>
                      <p class="card-text my-0">
                        {{ item.input_data_id?.ramaLeft1Year }}
                      </p>
                      <p class="card-text my-0">
                        {{ item.input_data_id?.ramaLeft1Number }}
                      </p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">2-chap</h6>
                      <p class="card-text my-0">
                        {{ item.input_data_id?.ramaLeft2Year }}
                      </p>
                      <p class="card-text my-0">
                        {{ item.input_data_id?.ramaLeft2Number }}
                      </p>
                    </div>

                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">1-balka</h6>
                      <p class="card-text my-0">{{ item.input_data_id?.balka1Year }}</p>
                      <p class="card-text my-0">{{ item.input_data_id?.balka1Number }}</p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">2-balka</h6>
                      <p class="card-text my-0">{{ item.input_data_id?.balka2Year }}</p>
                      <p class="card-text my-0">{{ item.input_data_id?.balka2Number }}</p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">Nomi</h6>
                      <p class="card-text my-0">Tegishliligi</p>
                      <p class="card-text my-0">Nomeri</p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">g'ildirak 1</h6>
                      <p class="card-text my-0">{{ item.input_data_id?.gildirak1 }}</p>
                      <p class="card-text my-0">
                        {{ item.input_data_id?.gildirak1Number }}
                      </p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">g'ildirak 2</h6>
                      <p class="card-text my-0">{{ item.input_data_id?.gildirak2 }}</p>
                      <p class="card-text my-0">
                        {{ item.input_data_id?.gildirak2Number }}
                      </p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">g'ildirak 3</h6>
                      <p class="card-text my-0">{{ item.input_data_id?.gildirak3 }}</p>
                      <p class="card-text my-0">
                        {{ item.input_data_id?.gildirak3Number }}
                      </p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">g'ildirak 4</h6>
                      <p class="card-text my-0">{{ item.input_data_id?.gildirak4 }}</p>
                      <p class="card-text my-0">
                        {{ item.input_data_id?.gildirak4Number }}
                      </p>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">Nomi</h6>
                      <p class="card-text my-0">Yili</p>
                      <p class="card-text my-0">Nomeri</p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">1-o'ng</h6>
                      <p class="card-text my-0">
                        {{ item.output_data_id?.ramaRight1Year }}
                      </p>
                      <p class="card-text my-0">
                        {{ item.output_data_id?.ramaRight1Number }}
                      </p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">2-o'ng</h6>
                      <p class="card-text my-0">
                        {{ item.output_data_id?.ramaRight2Year }}
                      </p>
                      <p class="card-text my-0">
                        {{ item.output_data_id?.ramaRight2Number }}
                      </p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">1-chap</h6>
                      <p class="card-text my-0">
                        {{ item.output_data_id?.ramaLeft1Year }}
                      </p>
                      <p class="card-text my-0">
                        {{ item.output_data_id?.ramaLeft1Number }}
                      </p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">2-chap</h6>
                      <p class="card-text my-0">
                        {{ item.output_data_id?.ramaLeft2Year }}
                      </p>
                      <p class="card-text my-0">
                        {{ item.output_data_id?.ramaLeft2Number }}
                      </p>
                    </div>

                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">1-balka</h6>
                      <p class="card-text my-0">{{ item.output_data_id?.balka1Year }}</p>
                      <p class="card-text my-0">{{ item.output_data_id?.balka1Number }}</p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">2-balka</h6>
                      <p class="card-text my-0">{{ item.output_data_id?.balka2Year }}</p>
                      <p class="card-text my-0">{{ item.output_data_id?.balka2Number }}</p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">Nomi</h6>
                      <p class="card-text my-0">Tegishliligi</p>
                      <p class="card-text my-0">Nomeri</p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">g'ildirak 1</h6>
                      <p class="card-text my-0">{{ item.output_data_id?.gildirak1 }}</p>
                      <p class="card-text my-0">
                        {{ item.output_data_id?.gildirak1Number }}
                      </p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">g'ildirak 2</h6>
                      <p class="card-text my-0">{{ item.output_data_id?.gildirak2 }}</p>
                      <p class="card-text my-0">
                        {{ item.output_data_id?.gildirak2Number }}
                      </p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">g'ildirak 3</h6>
                      <p class="card-text my-0">{{ item.output_data_id?.gildirak3 }}</p>
                      <p class="card-text my-0">
                        {{ item.output_data_id?.gildirak3Number }}
                      </p>
                    </div>
                    <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">g'ildirak 4</h6>
                      <p class="card-text my-0">{{ item.output_data_id?.gildirak4 }}</p>
                      <p class="card-text my-0">
                        {{ item.output_data_id?.gildirak4Number }}
                      </p>
                    </div>
                  </div>
                </div>
                <!-- G'ildirak juftliklari -->
              </div>
              <div class="card-footer">
                <p class="m-0" v-if="item?.remain_comment">
                  Izoh re,m: {{ item?.remain_comment }}
                </p>
                <p class="m-0" v-if="item.input_data_id?.input_comment">
                  Izoh kir: {{ item.input_data_id?.input_comment }}
                </p>
                <p class="m-0" v-if="item.output_data_id?.output_comment">
                  Izoh: {{ item.output_data_id?.output_comment }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
const modalOutputDataUpdate = ref(false);
const Data = ref([]);
const userData = ref({});

const selectedDepo = ref('');

let depos = ref([
  {value: 'O\'zvagonta\'mir', text: 'O\'zvagonta\'mir'},
  {value: 'VCHD-3', text: 'VCHD-3'},
  {value: 'VCHD-5', text: 'VCHD-5'},
  {value: 'VCHD-6', text: 'VCHD-6'},
]);
let tableDatasDr = ref([]);
let tableDatasKr = ref([]);
let tableDatasKrp = ref([]);
let tableDatasTo3 = ref([]);

const outputData = ref({
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

  output_comment: null,
});

//getVagonTable
let getVagonTableDr = async () => {
  try {
    const res = await axios.get("/api/vagon/get-vagon-table/repaired/dr");

    tableDatasDr.value = res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
//getVagonTable
let getVagonTableKr = async () => {
  try {
    const res = await axios.get("/api/vagon/get-vagon-table/repaired/kr");

    tableDatasKr.value = res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
//getVagonTable
let getVagonTableKrp = async () => {
  try {
    const res = await axios.get("/api/vagon/get-vagon-table/repaired/krp");

    tableDatasKrp.value = res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//getVagonTable
let getVagonTableTo3 = async () => {
  try {
    const res = await axios.get("/api/vagon/get-vagon-table/repaired/to3");

    tableDatasTo3.value = res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const selectDepo = (depoValue) => {
  selectedDepo.value = depoValue
}


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
    let res = await axios.get(`/api/vagon-output-data/all?depo=${encodeURIComponent(selectedDepo.value)}`);
    if (res.data) {
      // Iterate through the data and update createdAt and updatedAt fields
      Data.value = res.data.map(item => {
        item.createdAt = formatDate(item.createdAt);
        item.updatedAt = formatDate(item.updatedAt);
        item.input_data_id.createdAt = formatDate(item.input_data_id.createdAt);
        item.input_data_id.updatedAt = formatDate(item.input_data_id.updatedAt);
        item.output_data_id.createdAt = formatDate(item.output_data_id.createdAt);
        item.output_data_id.updatedAt = formatDate(item.output_data_id.updatedAt);
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
    let res = await axios.get("/api/vagon-input-data/one/" + id);
    if (res.data) {
      outputData.value = res.data;
      modalOutputDataUpdate.value = !modalOutputDataUpdate.value;
    }
  } catch (error) {
    console.error(error);
  }
};

const makeOutputDataNull = () => {
  outputData.value.vagon_id = null;

  outputData.value.ramaRight1Year = null;
  outputData.value.ramaRight1Number = null;

  outputData.value.ramaRight2Year = null;
  outputData.value.ramaRight2Number = null;

  outputData.value.ramaLeft1Year = null;
  outputData.value.ramaLeft1Number = null;

  outputData.value.ramaLeft2Year = null;
  outputData.value.ramaLeft2Number = null;

  outputData.value.balka1Year = null;
  outputData.value.balka1Number = null;

  outputData.value.balka2Year = null;
  outputData.value.balka2Number = null;

  outputData.value.gildirak1 = null;
  outputData.value.gildirak1Number = null;

  outputData.value.gildirak2 = null;
  outputData.value.gildirak2Number = null;

  outputData.value.gildirak3 = null;
  outputData.value.gildirak3Number = null;

  outputData.value.gildirak4 = null;
  outputData.value.gildirak4Number = null;

  outputData.value.output_comment = null;
};

//Create Input Data
const updateInputData = async () => {
  try {
    let res = await axios.patch(
      `/api/vagon-output-data/update/${outputData.value._id}`,
      outputData.value
    );
    if (res.data) {
      modalOutputDataUpdate.value = !modalOutputDataUpdate.value;
      makeOutputDataNull();
      getAll();
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  
  getAll();
  getVagonTableDr();
  getVagonTableKr();
  getVagonTableKrp();
  getVagonTableTo3();
});

watch(
  selectedDepo,
  async () => {
    if (selectedDepo.value !== undefined) {
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
