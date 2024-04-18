<template>
    <main>
        <h3>Журнал</h3>
        <h4>Триангелларни таьмирлаш ва синовдан ўтказиш</h4>
        <!-- Filter -->
        <div class="row mt-5">
        <div class="col-12">
            <div class="card shadow-sm">
            <div class="card-body ">
                <div class="row gy-3">
                    <button class="btn btn-success d-flex align-items-center justify-content-center fs-6 m-3 col" @click="addData">
                        <i class="bi bi-plus-circle me-2"></i>
                        <span>Add</span>
                    </button>
                    <div class="col-10">
                        <div>
                            <BFormRadioGroup
                            id="radio-group-1"
                            v-model="groupedSelected"
                            :options="groupedOptions"
                            name="radio-options"
                            />
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>

         <!-- List -->
        <div class="mt-5">
            <div class="card shadow-sm" style="overflow: auto; white-space: nowrap">
                <div class="card-body">
                <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
                    <BThead >
                        <BTr>
                            <BTd rowspan="2">Дата <br> испитания</BTd>
                            <BTd rowspan="2" >Номер вагона </BTd>
                            <BTd colspan="2" >Величина</BTd>
                            <BTd rowspan="2">Разность <br> испытания <br> от наружной <br> поверхност <br> и до оси </BTd>
                            <BTd colspan="2" >Расстояние</BTd>
                            <BTd  rowspan="2">Подпись <br> ответственного <br> лица</BTd>
                        </BTr>
                        <BTr>
                            <BTd>испытания</BTd>
                            <BTd>остаточной <br> деформатции</BTd>
                            <BTd>,,, внутренними <br> гранями</BTd>
                            <BTd>,,, наружной <br> гранями</BTd>
                        </BTr>
                    </BThead>
                    <BTbody>
                        <BTr v-show="addToggle"> 
                            <BTd><BFormInput v-model="formData.register_time" /></BTd>
                            <BTd>
                                <BFormSelect v-model="formData.vagon_nomer" :options="vagons" >
                                    <template #first>
                                        <BFormSelectOption :value="null" disabled>--номер вагона --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd><BFormInput v-model="formData.size" /></BTd>
                            <BTd><BFormInput v-model="formData.deformation" /></BTd>
                            <BTd><BFormInput v-model="formData.difference" /></BTd>
                            <BTd><BFormInput v-model="formData.internal_edges_distance" /></BTd>
                            <BTd><BFormInput v-model="formData.external_edges_distance" /></BTd>
                            <BTd>
                                <BFormSelect v-model="formData.inspector" :options="employeeList" >
                                    <template #first>
                                        <BFormSelectOption :value="null" disabled>--ответственного лица --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            
                            <BTd><BButton variant="outline-primary" @click="saveData"><i class="bi bi-floppy"></i></BButton></BTd>
                        </BTr>
                        <BTr class="align-middle" v-for="item in Data" :key="item._id">
                            <BTd>{{ item?.register_time }}</BTd>
                            <BTd >{{ item?.vagon_nomer?.nomer }}</BTd>
                            <BTd>{{ item?.size}}</BTd>
                            <BTd>{{ item?.deformation}}</BTd>
                            <BTd>{{ item?.difference}}</BTd>
                            <BTd>{{ item?.internal_edges_distance}}</BTd>
                            <BTd>{{ item?.external_edges_distance}}</BTd>
                            <BTd>{{ item?.inspector?.name }}</BTd>
                            
                            <BTd class="d-flex justify-content-center">
                                <button class="btn btn-primary" @click="getOne(item._id, item.status)">
                                    <i class="bi bi-pen-fill"></i>
                                </button>
                            </BTd>
                        </BTr>
                    </BTbody>
                </BTableSimple>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const addToggle = ref(false)
const Data = ref([])
const employeeList = ref([])
const vagons = ref([])

const formData = ref({
    register_time: '',
    vagon_nomer: '',
    size: '',
    deformation: '',
    difference: '',
    internal_edges_distance: '',
    external_edges_distance: '',
    inspector: '',
    status: '',
})

const groupedOptions = [
  {text: 'ЎТЙ', value: 'ЎТЙ'},
  {text: 'СНГ', value: 'СНГ'},
  {text: 'СОБ', value: 'СОБ'},
]
const groupedSelected = ref()

const addData = () => {
    makeFormNull()
    formData.value.status = groupedSelected.value
    addToggle.value = !addToggle.value
}

const saveData = async() => {
    try {
        if (formData.value._id) {
            const isConfirmed = confirm("O'zgarishni Saqlamoqchimisiz?");
            if(isConfirmed) {
                let res = await axios.patch("/api/telejka-sexi/triangel/update/" + formData.value._id, formData.value);
                if (res.data) {
                    addToggle.value = !addToggle.value
                    makeFormNull();
                    getAll();
                }
            }
        }else {
            const isConfirmed = confirm("Saqlamoqchimisiz");
            if(isConfirmed) {
                let res = await axios.post("/api/telejka-sexi/triangel/create", formData.value);
                if (res.data) {
                    addToggle.value = !addToggle.value
                    makeFormNull();
                    getAll();
                }
            }  
        }
        
    } catch (error) {
        console.error(error);
    }
}

const makeFormNull = () => {
    formData.value.register_time= null,
    formData.value.vagon_nomer= null,
    formData.value.size= null,
    formData.value.deformation= null,
    formData.value.difference= null,
    formData.value.internal_edges_distance= null,
    formData.value.external_edges_distance= null,
    formData.value.inspector= null,
    formData.value.status= null
}

// getAllData
const getAll = async() => {
    try {
        let res = await axios.get(`/api/telejka-sexi/triangel/all?status=${encodeURIComponent(groupedSelected.value)}`);
        if (res.data) { 
            Data.value = res.data;
        }

    } catch (error) {
        console.error(error);
    }
}

const getOne = async(id, status) => {
    try {
        let res = await axios.get("/api/telejka-sexi/triangel/one/" + id  + '/' + status);
        if (res.data) {
            addData()
            formData.value = res.data;
        }
    } catch (error) {
        console.error(error);
    }
}

// allEmployee
const allEmployee = async() => {
    try {
    let res = await axios.get(`/api/employee/all?section=g'ildirakSexi`);
    if (res.data) {
        employeeList.value = res.data.map(function (item) {
            return { text: item.name, value: item._id};
        });
    }
  } catch (error) {
    console.error(error);
  }
}

// allRepairingVagons
const allRepairingVagons = async() => {
    try {
    let res = await axios.get("/api/vagon/repairing-vagons");
    if (res.data) {
        vagons.value = res.data.map(function (item) {
            return { text: item.nomer, value: item._id };
        });
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
    groupedSelected.value = 'ЎТЙ';
    formData.value.status = groupedSelected.value;
    getAll();
    allEmployee();
    allRepairingVagons();
});

watch((groupedSelected.value)  =()=> {
    formData.value.status = groupedSelected.value;
    getAll();
})

</script>

<style lang="scss" scoped>

.vertical-text {
    writing-mode: vertical-rl; /* Set text direction to vertical */
    transform: rotate(180deg); /* Rotate the text by 180 degrees */
    white-space: nowrap; /* Prevent wrapping */
  }

  .center-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>