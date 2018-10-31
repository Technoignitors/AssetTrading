import Api from "@/services/Api";
const header = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem("token")}`
  }
}

export default {

  fetchPosts() {
    return Api().get("posts");
  },
  addPost(params) {
    return Api().post("posts", params);
  },
  updatePost(params) {
    return Api().put("posts/" + params.id, params);
  },

  getPost(params) {
    return Api().get("posts/" + params.id);
  },
  deletePost(id) {
    return Api().delete("posts/" + id);
  },
  login(data) {
    return Api().post("users/login", data);
  },
  logout() {
    return Api().get("users/logout");
  },
  getUserProfile() {
    return Api().get("users/getUserProfile", header);
  },
  setUserProfile(data) {
    return Api().post("users/userProfile",data, header);
  },
  getCategories() {
    return Api().get("users/getCategories", header);
  },
  uploadAsset(data) {
    return Api().post("assets/upload",data, header);
  },
};
