import { getConfig } from "config";
import { DataSource } from "typeorm";

const cfg = getConfig();
export default new DataSource(cfg.db);
