import { Mastra } from '@mastra/core';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { searchAgent } from './agents/search-agent';

export const mastra = new Mastra({
  agents: { searchAgent },
  storage: new LibSQLStore({
    // テレメトリ/評価などのインメモリストレージ。永続化する場合は file:../mastra.db に変更
    id: 'mastra-storage',
    url: 'file::memory:',
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
