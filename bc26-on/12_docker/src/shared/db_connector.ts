import { DataSource } from "typeorm";
import { getConfig } from "../config";

let dataSource: DataSource;

export async function setupConnection() {
  const cfg = getConfig();

  dataSource = new DataSource(cfg.db);

  await dataSource.initialize();
}

export function getDataSource(): DataSource {
  return dataSource;
}
