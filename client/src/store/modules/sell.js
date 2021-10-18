import { GetUploadUrl, UploadToBucket, AddImageToListing } from "../../services/ImageServices"
import { SubmitNewListing } from '../../services/ListingServices'

const iState = () => {
  return {
    title: '',
    price: '',
    plant: '',
    description: '',
    quantity: '',
    imageFile: null,
    imagePreview: null,
    localFileName: '',
    s3FileName: '',
    uploadUrl: '',
    sellStatus: '',
    uploadStatus: '',
    listingId: null,
    listingStatus: ''
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
    state.localFileName = payload
  },
  setS3FileName(state, payload){
    state.s3FileName = payload
  },
  setImagePreview(state, payload){
    state.imagePreview = payload
  },
  setUploadUrl(state, payload){
    state.uploadUrl = payload
  },
  setUploadStatus(state, payload){
    state.uploadStatus = payload
  },
  setListingStatus(state, payload){
    state.listingStatus = payload
  },
  resetFileUpload(state){
    state.imageFile = iState().imageFile
    state.imagePreview = iState().imagePreview
    state.localFileName = iState().localFileName
    state.s3FileName = iState().s3FileName
    state.uploadUrl = iState().uploadUrl
    state.uploadStatus = iState().uploadStatus
  },
  resetSellForm(state){
    Object.assign(state, iState())
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
    commit('setLocalFileName',payload)
  },
  setS3FileName({commit}, payload){
    commit('setS3FileName',payload)
  },
  setImagePreview({commit}, payload){
    commit('setImagePreview',payload)
  },
  setUploadUrl({commit}, payload){
    commit('setUploadUrl',payload)
  },
  resetFileUpload({commit}){
    commit('resetFileUpload')
  },
  async getUploadUrl({commit}){
    const res = await GetUploadUrl()
    if(res.status === 200){
      const uploadUrl = res.data.uploadUrl
      commit('setUploadUrl', uploadUrl)
      const s3File = uploadUrl.split('?')[0].split('/').at(-1)
      commit('setS3FileName', s3File)
    }
  },
  async uploadToBucket({state, commit}){
    if(state.uploadUrl && state.imageFile){
      const imageRes = await UploadToBucket(state.uploadUrl, state.imageFile)
      if(imageRes.status === 200){
        commit('setUploadStatus', 'Uploaded')
      } else {
        commit('setUploadStatus', 'Error')
      }
    }
  },
  async submitListing({rootState, commit}){
    const listingReq = {
      listing: {
        title: rootState.sell.title,
        price: rootState.sell.price,
        plant: rootState.sell.plant,
        description: rootState.sell.description,
        quantity: rootState.sell.quantity,
        user_id: rootState.auth.user.id
      }
    }
    const listingRes = await SubmitNewListing(listingReq)
    if(listingRes.status === 200) {
      if(rootState.sell.uploadStatus === 'Uploaded'){
        const listingImageReq = {
          file_name: rootState.sell.s3FileName,
          user_id: rootState.auth.user.id,
          listing_id: listingRes.data.id
        }
        const listingImageRes = await AddImageToListing(listingImageReq)
        if(listingImageRes.status === 200){
          commit('setListingStatus', 'Submitted with image')
        }
      } else {
        commit('setListingStatus', 'Submitted')
      }
    } else {
      commit('setListingStatus', 'Failed')
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