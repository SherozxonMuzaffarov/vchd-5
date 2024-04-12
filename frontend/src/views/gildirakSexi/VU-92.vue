<template>
    <main>
        
        <h3>Журнал</h3>
        <h4>промежуточной ревизии букс с роликовыми подшипниками</h4>
        
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

        formData: {{ formData }}
        <br>
        Data: {{ Data }}
         <!-- List -->
        <div class="mt-5">
            <div class="card shadow-sm" style="overflow: auto; white-space: nowrap">
                <div class="card-body">
                <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
                    <BThead >
                        <BTr >
                            <BTd rowspan="2">№ колесной <br> пары рег. номер</BTd>
                            <BTd rowspan="2">№</BTd>
                            <BTd rowspan="2">Дата <br> ревизии </BTd>
                            <BTd colspan="2">Номер </BTd>
                            <BTd rowspan="2">Тип <br> колосной пары </BTd>
                            <BTd rowspan="2" >Состояние <br> буксового узла </BTd>
                            <BTd rowspan="2" colspan="2">Ревизия <br> произведена при <br> выполнении работ </BTd>
                            <BTd colspan="2">Подпись</BTd>
                            
                        </BTr>
                        <BTr >
                            <BTd >вагона</BTd>
                            <BTd >колесной <br> пары</BTd>
                            <BTd >производевшего <br> ревизию</BTd>
                            <BTd >мастера</BTd>
                        </BTr>
                    </BThead>
                    <BTbody>
                        <BTr v-show="addToggle">
                            <BTd>
                                <BFormSelect v-model="formData.vu53_register_number" :options="vu53s" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--мастер --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd>auto</BTd>
                            <BTd><BFormInput v-model="formData.register_time" /></BTd>
                            <BTd>{{ formData.vagon_nomer }}</BTd>
                            <BTd>{{ formData.vu53_number }}</BTd>
                            <BTd >
                                <BFormSelect v-model="formData.vu53_type" :options="vu53Types" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--мастер --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd><BFormInput v-model="formData.sostoyana" /></BTd>
                            <BTd><BFormInput v-model="formData.before_inspect" /></BTd>
                            <BTd><BFormInput v-model="formData.after_inspect" /></BTd>
                            <BTd > 
                                <BFormSelect v-model="formData.inspector" :options="employeeList" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--Лица, производившего ремонт --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd >
                                <BFormSelect v-model="formData.master" :options="employeeList" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--мастер --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd ><BButton variant="outline-primary" @click="saveData"><i class="bi bi-floppy"></i></BButton></BTd>
                        </BTr>
                        <BTr class="align-middle" v-for="item in Data" :key="item._id">
                            <BTd>{{ item?.vu53_register_number?.register_number }}</BTd>
                            <BTd>{{ item?.register_number }}</BTd>
                            <BTd>{{ item?.register_time }}</BTd>
                            <BTd >{{ item?.vagon_nomer }}</BTd>
                            <BTd>{{ item?.vu53_number }}</BTd>
                            <BTd>{{ item?.vu53_type }}</BTd>
                            <BTd>{{ item?.sostoyana }}</BTd>
                            <BTd>{{ item?.before_inspect }}</BTd>
                            <BTd>{{ item?.after_inspect }}</BTd>
                            <BTd>
                                {{ item?.inspector?.name }}
                                 <span v-if="item?.is_inspector_sign"><i class="bi bi-check-circle-fill"></i></span>
                                 <span v-else><i class="bi bi-hourglass-split"></i></span>
                            </BTd>
                            <BTd>
                                {{ item?.master?.name }}
                                 <span v-if="item?.is_master_sign"><i class="bi bi-check-circle-fill"></i></span>
                                 <span v-else><i class="bi bi-hourglass-split"></i></span>
                            </BTd>
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
        {{ vu53s }}
    </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const addToggle = ref(false)
const Data = ref([])
const employeeList = ref([])
const vu53s = ref([])

const formData = ref({
    vu53_register_number: null,
    register_time: null,
    vagon_nomer: null,
    vu53_number: null,
    vu53_type: null,
    sostoyana: null,
    before_inspect: null,
    after_inspect: null,
    inspector: null,
    master: null,
    status: null,
})

const vu53Types = [
  {text: 'РУ1', value: 'РУ1'},
  {text: 'РУ1Ш', value: 'РУ1Ш'}
]

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
                let res = await axios.patch("/api/gildirak-sexi/vu-92/update/" + formData.value._id, formData.value);
                if (res.data) {
                    addToggle.value = !addToggle.value
                    makeFormNull();
                    getAll();
                }
            }
        }else {
            const isConfirmed = confirm("Saqlamoqchimisiz");
            if(isConfirmed) {
                let res = await axios.post("/api/gildirak-sexi/vu-92/create", formData.value);
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
    formData.value.vu53_register_number = '';
    formData.value.register_time = '';
    formData.value.vagon_nomer = '';
    formData.value.vu53_number = '';
    formData.value.vu53_type = '';
    formData.value.sostoyana = '';
    formData.value.before_inspect = '';
    formData.value.after_inspect = '';
    formData.value.inspector = '';
    formData.value.master = '';
    formData.value.status = '';
}

// getAllData
const getAll = async() => {
    try {
        let res = await axios.get(`/api/gildirak-sexi/vu-92/all?status=${encodeURIComponent(groupedSelected.value)}`);
        if (res.data) { 
            Data.value = res.data;
        }

    } catch (error) {
        console.error(error);
    }
}

const getOne = async(id, status) => {
    try {
        let res = await axios.get("/api/gildirak-sexi/vu-92/one/" + id  + '/' + status);
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
const getAllVu53 = async() => {
    try {
    let res = await axios.get(`/api/gildirak-sexi/vu-53/all?status=${encodeURIComponent(groupedSelected.value)}`);
    if (res.data) {
        vu53s.value = res.data.map(function (item) {
            return { text: item.register_number, value: item._id, number: item.number, vagon_nomer: item.vagon};
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
    getAllVu53()
});

watch(
  [groupedSelected, formData.value],
  async () => {
    formData.value.status = groupedSelected.value;
    formData.value.vu53_number = vu53s.value.find(item => item.value == formData.value.vu53_register_number)?.number;
    formData.value.vagon_nomer = vu53s.value.find(item => item.value == formData.value.vu53_register_number)?.vagon_nomer?.nomer;
    getAll();
    getAllVu53();
  },
  { deep: true }
);


</script>

<style lang="scss" scoped>

.vertical-text {
    writing-mode: vertical-rl; 
    transform: rotate(180deg);
    white-space: nowrap; 
}

.center-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>