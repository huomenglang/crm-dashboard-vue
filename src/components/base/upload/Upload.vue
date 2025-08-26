<template>
  <a-upload
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    accept="image/*"
    :show-upload-list="false"
    v-bind="restProps"
    @change="handleChange"
  >
    <template v-if="(imageUrl || urlLink) && showImage">
      <img :src="imageUrl || urlLink" alt="avatar" style="width: 80px;height:  fit-content;" class="rounded-md"  />
    </template>

    <template v-else>
      <slot name="uploadButton" v-bind="{ loading, imageUrl, fileList }">
        <div >
          <LoadingOutlined v-if="loading" />
          <PlusOutlined v-else />
          <div style="margin-top: 8px">Upload</div>
        </div>
      </slot>
    </template>
  </a-upload>
</template>

<script setup>
import { ref, computed } from "vue"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons-vue"
import { getBase64 } from "@/utils/file" // helper to convert file -> base64

// ✅ Props
const props = defineProps({
  urlLink: {
    type: String,
    default: undefined
  },
  showImage: {
    type: Boolean,
    default: true
  }
})

// ✅ Emits
const emit = defineEmits(["change"])

// ✅ State
const imageUrl = ref("")
const loading = ref(false)
const fileList = ref([])

// ✅ Forward all props except urlLink, showImage
const restProps = computed(() => {
  const { urlLink, showImage, ...otherProps } = props
  return otherProps
})

// ✅ Handle file upload change
const handleChange = async (info) => {
  loading.value = true
  try {
    const base64Data = await getBase64(info.file.originFileObj)
    imageUrl.value = base64Data
    fileList.value = info.fileList

    emit("change", { file: info.file, fileList: info.fileList, base64: base64Data })
    // emit("change", base64Data)
  } catch (error) {
    console.error("Error processing file:", error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.avatar-uploader {
  display: inline-block;
}
</style>
