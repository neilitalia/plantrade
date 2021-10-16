import { GetUploadUrl } from "../../services/ImageServices"

const iState = () => {
  return {
    title: '',
    price: 0,
    plant: '',
    description: '',
    quantity: 0,
    imageFile: null,
    imagePreview: null,
    localFileName: '',
    s3FileName: '',
    uploadUrl: ''
  }
}

const state = () => iState()

const mutations = {
  setTitle(state, payload){
    state.title = payload
  },
  setPrice(state, payload){
    state.price = payload
  },
  setPlant(state, payload){
    state.plant = payload
  },
  setDescription(state, payload){
    state.description = payload
  },
  setQuantity(state, payload){
    state.quantity = payload
  },
  setImageFile(state, payload){
    state.imageFile = payload
  },
  setLocalFileName(state, payload){
    state.imageFileName = payload
  },
  setS3FileName(state, payload){
    state.s3FileName = payload
  },
  setImagePreview(state, payload){
    state.imagePreview = payload
  },
  setUploadUrl(state, payload){
    state.uploadUrl = payload
  }
}

const actions = {
  setTitle({commit}, payload){
    commit('setTitle', payload)
  },
  setPrice({commit}, payload){
    commit('setPrice', payload)
  },
  setPlant({commit}, payload){
    commit('setPlant', payload)
  },
  setDescription({commit}, payload){
    commit('setDescription', payload)
  },
  setQuantity({commit}, payload){
    commit('setQuantity', payload)
  },
  setImageFile({commit}, payload){
    commit('setImageFile',payload)
  },
  setLocalFileName({commit}, payload){
    commit('setImageFileName',payload)
  },
  setS3FileName({commit}, payload){
    commit('setImageFileName',payload)
  },
  setImagePreview({commit}, payload){
    commit('setImagePreview',payload)
  },
  setUploadUrl({commit}, payload){
    commit('setUploadUrl',payload)
  },
  async getUploadUrl({commit}){
    const res = await GetUploadUrl()
    if(res.status === 200){
      const uploadUrl = res.data.uploadUrl
      commit('setUploadUrl', uploadUrl)
      const s3File = uploadUrl.split('?')[0].split('/').at(-1)
      commit('setS3FileName', s3File)
    }
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}