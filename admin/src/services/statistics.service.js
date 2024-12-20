import API from "@/api/axios.config";

class StatisticsService {
  async getStatistics() {
    return API.get("/statistics");
  }
}

export default new StatisticsService();
