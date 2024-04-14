<template>
    <main>
        <h4> Натурный колесный листок</h4>
        <h3>Приход</h3>

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
{{ sampleData }}
         <!-- List -->
        <div class="mt-5">
            <div class="card shadow-sm" style="overflow: auto; white-space: nowrap">
                <div class="card-body">
                <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
                    <BThead >
                        <BTr >
                            <BTd rowspan="2">№ <br/> рег ви-53</BTd>
                            <BTd rowspan="2">Дата <br/> поступления</BTd>
                            <BTd rowspan="2">№ <br/> колесной пары</BTd>
                            <BTd rowspan="2">Тип</BTd>
                            <BTd rowspan="2">Диаметр <br/> по кругу <br/> катания <br/> колеса </BTd>
                            <BTd colspan="3">Дата и пункт </BTd>
                        </BTr>
                        <BTr >
                            <BTd>Изготовления оси</BTd>
                            <BTd >Последного <br/> формирования</BTd>
                            <BTd >
                                Последнего полного <br/> освидетельствования <br/>
                                и монтажа букс <br/> роликовых  подшипников
                            </BTd>
                        </BTr>
                        
                    </BThead>
                    <BTbody>
                        <!-- <BTr v-show="addToggle">
                            
                            <BTd><BFormInput v-model="formData.register_number" /></BTd>
                            <BTd><BFormInput v-model="formData.register_time" /></BTd>
                            <BTd>
                                <BFormSelect v-model="formData.vagon" :options="vagons" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--Vagon nomer --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd>
                                <BFormSelect v-model="formData.type" :options="vu53Types" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--Vagon nomer --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd><BFormInput v-model="formData.number" /></BTd>
                            <BTd><BFormInput v-model="formData.defective" /></BTd>
                            <BTd><BFormInput v-model="formData.os_year" /></BTd>
                            <BTd><BFormInput v-model="formData.last_repair" /></BTd>
                            <BTd><BFormInput v-model="formData.buksa" /></BTd>
                            <BTd><BFormInput v-model="formData.diameter.right" /></BTd>
                            <BTd><BFormInput v-model="formData.diameter.left"/></BTd>
                            <BTd><BButton variant="outline-primary" @click="saveData"><i class="bi bi-floppy"></i></BButton></BTd>
                        </BTr> -->
                        <BTr class="align-middle" v-for="item in Data" :key="item._id">
                            <BTd>{{ item?.register_number }}</BTd>
                            <BTd>{{ item?.register_time }}</BTd>
                            <BTd>{{ item?.number }}</BTd>
                            <BTd>{{ item?.type }}</BTd>
                            <BTd>{{ item?.diameter?.right }} | {{ item?.diameter?.left }}</BTd>
                            <BTd >{{ item?.os_year }}</BTd>
                            <BTd>{{ item?.last_repair}}</BTd>
                            <BTd>{{ item?.buksa }}</BTd>
                        </BTr>
                    </BTbody>
                </BTableSimple>

                <BTableSimple striped="true" hover="true" bordered="true" class="mt-3">
                    <BThead >
                        
                        <BTr >
                            <BTd >Выкачана <br/> из-под <br/> вагона</BTd>
                            <BTd >Поступила от <br/> ВЧД, ВКМ, <br/> завода, ПТО</BTd>
                            <BTd >№ <br/> пересылочной <br/> ведомости </BTd>
                            <BTd >
                                Исправная <br/>( нового формирования <br/> или отремонтированная ) <br/>
                                неисправ (№ дефекта  <br/> по классификатору )
                            </BTd>
                            <BTd >Вид требуемого <br/> ремонта </BTd>
                            
                        </BTr>
                    </BThead>
                    <BTbody>
                       <!-- <BTr v-show="addToggle">
                            
                            <BTd><BFormInput v-model="formData.register_number" /></BTd>
                            <BTd><BFormInput v-model="formData.register_time" /></BTd>
                            <BTd>
                                <BFormSelect v-model="formData.vagon" :options="vagons" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--Vagon nomer --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd>
                                <BFormSelect v-model="formData.type" :options="vu53Types" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--Vagon nomer --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd><BFormInput v-model="formData.number" /></BTd>
                            <BTd><BFormInput v-model="formData.defective" /></BTd>
                            <BTd><BFormInput v-model="formData.os_year" /></BTd>
                            <BTd><BFormInput v-model="formData.last_repair" /></BTd>
                            <BTd><BFormInput v-model="formData.buksa" /></BTd>
                            <BTd><BFormInput v-model="formData.diameter.right" /></BTd>
                            <BTd><BFormInput v-model="formData.diameter.left"/></BTd>
                            <BTd><BButton variant="outline-primary" @click="saveData"><i class="bi bi-floppy"></i></BButton></BTd>
                        </BTr> -->
                        <BTr class="align-middle" v-for="item in Data" :key="item._id">
                            <BTd >{{ item?.vagon?.nomer }}</BTd>
                            <BTd>{{  }}</BTd>
                            <BTd>{{  }}</BTd>
                            <BTd>{{  }}</BTd>
                            <BTd>{{ item?.os_year }}</BTd>
                            
                            <BTd class="d-flex justify-content-center">
                                <button class="btn btn-primary" @click="getOne(item._id, item.status)">
                                    <i class="bi bi-pen-fill"></i>
                                </button>
                                <button 
                                    @click="$router.push('/gildirak-sexi/vu-53-expense/' + item._id  + '/' + item.status)"
                                    :class="{'btn': true, 'btn-success': item.is_used, 'btn-danger': !item.is_used}">
                                    <i class="bi bi-bell"></i>
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
const sampleData = ref([])
const vagons = ref([])
const vu53Types = [
  {text: 'РУ1', value: 'РУ1'},
  {text: 'РУ1Ш', value: 'РУ1Ш'}
]

const formData = ref({
    _id: '',
    register_number: '',
    register_time: '',
    vagon: '',
    type: '',
    number: '',
    defective: '',
    os_year: '',
    last_repair: '',
    buksa: '',
    diameter: {
        right: '',
        left: ''
    },
    status: '',
})

const groupedOptions = [
  {text: 'ЎТЙ', value: 'ЎТЙ'},
  {text: 'КЗХ', value: 'КЗХ'},
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
                let res = await axios.patch("/api/gildirak-sexi/vu-53/update/" + formData.value._id, formData.value);
                if (res.data) {
                    addToggle.value = !addToggle.value
                    makeFormNull();
                    getAll();
                }
            }
        }else {
            const isConfirmed = confirm("Saqlamoqchimisiz");
            if(isConfirmed) {
                let res = await axios.post("/api/gildirak-sexi/vu-53/create", formData.value);
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
    formData.value._id= '',
    formData.value.register_number= '',
    formData.value.register_time= '',
    formData.value.vagon= '',
    formData.value.type= '',
    formData.value.number= '',
    formData.value.last_repair= '',
    formData.value.defective= '',
    formData.value.os_year= '',
    formData.value.buksa= '',
    formData.value.diameter= {
        right: '',
        left: ''
    },
    formData.value.status= ''
}

// getAllData
const getAll = async() => {
    try {
        let res = await axios.get(`/api/gildirak-sexi/vu-53/all?status=${encodeURIComponent(groupedSelected.value)}`);
        if (res.data) { 
            Data.value = null;
            sampleData.value = null
        }

    } catch (error) {
        console.error(error);
    }
}

const getOne = async(id, status) => {
    try {
        let res = await axios.get("/api/gildirak-sexi/vu-53/one/" + id  + '/' + status);
        if (res.data) {
            addData()
            formData.value = res.data;
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
    allRepairingVagons();
});

watch(groupedSelected.value  =()=> {
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