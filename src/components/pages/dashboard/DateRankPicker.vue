<template>
  <a-range-picker
    v-bind="$attrs"
    :value="innerValue"
    :format="format"
    :allowClear="true"
    :separator="'~'"
    :show-time="showTime"
    :mode="mode"
    :disabled-date="disabledDate"
    @panelChange="onPanelChange"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import type { Dayjs } from "dayjs"

interface Props {
  modelValue?: [Dayjs, Dayjs] | null
  format?: string
  showTime?: boolean
  mode?: string[] // ['date', 'date'] by default
  disabledDate?: (current: Dayjs) => boolean
}

const props = withDefaults(defineProps<Props>(), {
  format: "YYYY-MM-DD",
  showTime: false,
  mode: () => ["date", "date"],
})

const emit = defineEmits(["update:modelValue", "change", "panelChange"])

const innerValue = ref<[Dayjs, Dayjs] | null>(props.modelValue ?? null)

watch(
  () => props.modelValue,
  (val) => {
    innerValue.value = val ?? null
  }
)

const onChange = (dates: [Dayjs, Dayjs] | null) => {
  innerValue.value = dates
  emit("update:modelValue", dates)
  emit("change", dates)
}

const onPanelChange = (dates: any, modes: string[]) => {
  emit("panelChange", dates, modes)
}
</script>
