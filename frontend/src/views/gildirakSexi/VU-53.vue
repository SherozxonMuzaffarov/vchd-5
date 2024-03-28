<template>
    <main>
        
        <h5>ВУ-53</h5>
            <!-- Modal create -->
        <BModal
        class="modal-xl"
        v-model="modalRasxot"
        @ok.prevent="handleOk"
        @keyup.enter="handleOk"
        @cancel="modalRasxot = !modalRasxot"
        cancelTitle="Chiqish"
        okTitle="Saqlash"
        >
        {{ expenseFormData }}
            <div class="row">
                <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
                    <BThead >
                        <BTr >
                            <BTd  colspan="15">Расхот</BTd>
                            <BTd  colspan="3">Выполненый ремонт</BTd>
                            <BTd  rowspan="4" class="vertical-text ">Дата полного освидетельствование <br/> колесной пары </BTd>
                        </BTr>
                        <BTr >
                            <BTd rowspan="3" class="vertical-text" >Дата отправка или подкатки <br/> под вагон </BTd>
                            <BTd rowspan="3" >
                                Наименования <br/> завода или пункта, <br/>
                                куда направлена <br/> колесная пара, <br/> или номер вагона, <br/>
                                из-под которого она <br/> подкачена 
                            </BTd>
                            <BTd colspan="13">Размер колесной пары (мм)</BTd>
                            <!--  -->
                            <BTd colspan="2" rowspan="2">Полная <br/>  ревизия <br/>  роликовых <br/> букс</BTd>
                            <BTd rowspan="3" class="vertical-text" >Прочие работы</BTd>

                        </BTr>
                        <BTr >
                            <BTd colspan="2">Диаметр оси</BTd>
                            <BTd colspan="11" >Колеса</BTd>
                        </BTr>
                        <BTr class="align-middle">
                            
                            <BTd class="vertical-text" colspan="2">Посредние</BTd>
                            <BTd class="vertical-text" colspan="2">Толшена обода</BTd>
                            <BTd class="vertical-text" colspan="2">Прокат</BTd>
                            <BTd class="vertical-text" colspan="2">Толшена диска</BTd>
                            <BTd class="vertical-text" colspan="2">Толшена гребня</BTd>
                            <BTd class="vertical-text" colspan="2">Диаметр по <br/> кругу катания</BTd>
                            <BTd class="vertical-text" >Расстояние между <br/> анутре ,,,,,,</BTd>
                            <!--  -->
                            <BTd class="vertical-text" >С обточкойь <br/> поверхности катания</BTd>
                            <BTd class="vertical-text" >Без обточкойь <br/> поверхности катания</BTd>
                        </BTr>
                    </BThead>
                    <BTbody>
                       <BTr>
                            
                            <BTd><BFormInput v-model="expenseFormData.register_time" /></BTd>
                            <BTd><BFormInput v-model="expenseFormData.mediator.right" /></BTd>
                            <BTd><BFormInput v-model="expenseFormData.mediator.left"/></BTd>
                            <BTd><BFormInput v-model="expenseFormData.obod_thickness.right" /></BTd>
                            <BTd><BFormInput v-model="expenseFormData.obod_thickness.left"/></BTd>
                            <BTd><BFormInput v-model="expenseFormData.prokat.right" /></BTd>
                            <BTd><BFormInput v-model="expenseFormData.prokat.left"/></BTd>
                            <BTd><BFormInput v-model="expenseFormData.disk_thickness.right" /></BTd>
                            <BTd><BFormInput v-model="expenseFormData.disk_thickness.left"/></BTd>
                            <BTd><BFormInput v-model="expenseFormData.grebn_thickness.right" /></BTd>
                            <BTd><BFormInput v-model="expenseFormData.grebn_thickness.left"/></BTd>
                            <BTd><BFormInput v-model="expenseFormData.diameter_krug.right" /></BTd>
                            <BTd><BFormInput v-model="expenseFormData.diameter_krug.left"/></BTd>
                            <BTd><BFormInput v-model="expenseFormData.distance"/></BTd>
                            <BTd><BFormInput v-model="expenseFormData.with_rurning"/></BTd>
                            <BTd><BFormInput v-model="expenseFormData.without_turning"/></BTd>
                            <BTd><BFormInput v-model="expenseFormData.other_works"/></BTd>
                            <BTd><BFormInput v-model="expenseFormData.full_examination_date"/></BTd>
                            <BTd><BButton variant="outline-primary" @click="saveData"><i class="bi bi-floppy"></i></BButton></BTd>
                        </BTr>
                    </BTbody>
                </BTableSimple>
            </div>
        </BModal>
        <!-- Modal create -->

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
                        <BTr >
                            <BTd colspan="11" >Прихот</BTd>
                            <BTd  rowspan="4">Расхот</BTd>
                        </BTr>
                        <BTr >
                            <BTd rowspan="3" class="vertical-text " >№ По порядку</BTd>
                            <BTd rowspan="3" class="vertical-text" >Дата поступления</BTd>
                            <BTd rowspan="3" >
                                Наименования <br/> завода или пункта, <br/>
                                откуда ноступиса <br/> колесная пара, <br/> или номер вагона, <br/>
                                из-под которого она <br/> выкачена 
                            </BTd>
                            <BTd colspan="8">Характеристика колосной пары</BTd>
                        </BTr>
                        <BTr >
                            <BTd rowspan="2" class="vertical-text">Тип колосной пары</BTd>
                            <BTd rowspan="2">Номер <br/> колосной  пары</BTd>
                            <BTd rowspan="2" class="vertical-text">Дефект</BTd>
                            <BTd colspan="3">Дата и пункт</BTd>
                            <BTd colspan="2" rowspan="3" class="vertical-text">
                                Диаметр по кругу <br/> катания колеса <br/>
                                ( числитель-правос, <br/> знаменатель-левос)
                            </BTd>
                        </BTr>
                        <BTr class="align-middle">
                            <BTd class="vertical-text">Изготовления оси</BTd>
                            <BTd class="vertical-text">Последного <br/> формирования</BTd>
                            <BTd class="vertical-text">
                                Последнего полного <br/> освидетельствование <br/> колесной пары и <br/>
                                монтажа букс для <br/> роликовых  колесных пар
                            </BTd>
                        </BTr>
                    </BThead>
                    <BTbody>
                       <BTr v-show="addToggle">
                            
                            <BTd><BFormInput v-model="formData.register_number" /></BTd>
                            <BTd><BFormInput v-model="formData.register_time" /></BTd>
                            <BTd>
                                <BFormSelect v-model="formData.vagon" :options="vagons" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--Vagon nomer --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd><BFormInput v-model="formData.type" /></BTd>
                            <BTd><BFormInput v-model="formData.number" /></BTd>
                            <BTd><BFormInput v-model="formData.defective" /></BTd>
                            <BTd><BFormInput v-model="formData.os_year" /></BTd>
                            <BTd><BFormInput v-model="formData.last_repair" /></BTd>
                            <BTd><BFormInput v-model="formData.buksa" /></BTd>
                            <BTd><BFormInput v-model="formData.diameter.right" /></BTd>
                            <BTd><BFormInput v-model="formData.diameter.left"/></BTd>
                            <BTd><BButton variant="outline-primary" @click="saveData"><i class="bi bi-floppy"></i></BButton></BTd>
                        </BTr>
                        <BTr class="align-middle" v-for="item in Data" :key="item._id">
                            <BTd>{{ item?.register_number }}</BTd>
                            <BTd>{{ item?.register_time }}</BTd>
                            <BTd >{{ item?.vagon?.nomer }}</BTd>
                            <BTd>{{ item?.type }}</BTd>
                            <BTd>{{ item?.number }}</BTd>
                            <BTd>{{ item?.defective}}</BTd>
                            <BTd>{{ item?.os_year }}</BTd>
                            <BTd>{{ item?.last_repair }}</BTd>
                            <BTd>{{ item?.buksa}}</BTd>
                            <BTd>{{ item?.diameter?.right }}</BTd>
                            <BTd>{{ item?.diameter?.left }}</BTd>
                            <BTd class="d-flex justify-content-center">
                                <button class="btn btn-primary" @click="getOne(item._id, item.status)">
                                    <i class="bi bi-pen-fill"></i>
                                </button>
                                <button
                                    class="btn btn-success ml-2" 
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    @click="modalRasxot = !modalRasxot"
                                >
                                <i class="bi bi-arrow-up-right-square-fill"></i>
                                </button>
                            </BTd>
                        </BTr>
                    </BTbody>
                </BTableSimple>
                </div>
            </div>
        </div>
        {{ formData }}
        {{ groupedSelected }}
        <hr/>
        {{Data}}
    </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const addToggle = ref(false)
const modalRasxot = ref(false);
const Data = ref([])
const vagons = ref([])

const formData = ref({
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

const expenseFormData = ref({
    vagon: '',
    register_time: '',
    mediator:  {
        right: '',
        left: ''
    },
    obod_thickness:  {
        right: '',
        left: ''
    },
    prokat:  {
        right: '',
        left: ''
    },
    disk_thickness:  {
        right: '',
        left: ''
    },
    grebn_thickness:  {
        right: '',
        left: ''
    },
    diameter_krug:  {
        right: '',
        left: ''
    },
    distance: '',
    with_rurning: '',
    without_turning: '',
    other_works: '',
    full_examination_date: '',
})

const groupedOptions = [
  {text: 'ЎТЙ', value: 'ЎТЙ'},
  {text: 'КЗХ', value: 'КЗХ'},
  {text: 'СОБ', value: 'СОБ'},
]

const groupedSelected = ref()

const addData = () => {
    makeFormNull()
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
    formData.value.register_number= null,
    formData.value.register_time= null,
    formData.value.vagon= null,
    formData.value.type= null,
    formData.value.number= null,
    formData.value.last_repair= null,
    formData.value.defective= null,
    formData.value.os_year= null,
    formData.value.buksa= null,
    formData.value.diameter= {
        right: null,
        left: null
    },
    formData.value.status= null
}

// getAllData
const getAll = async() => {
    try {
        let res = await axios.get(`/api/gildirak-sexi/vu-53/all?status=${encodeURIComponent(groupedSelected.value)}`);
        if (res.data) { 
            Data.value = res.data;
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

//create Expense
const handleOk = async () => {
  try {
    alert("Saqlamoqchi");
    let res = await axios.post("/api/gildirak-sexi/vu-53/create-expense", expenseFormData.value);
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