import _ from 'lodash';

// За какой промежуток усредняем данные
const intervalMinutes = 5;

export const ACTION_BULK_UPDATE   = 'bulk_update';
export const ACTION_SINGLE_UPDATE = 'single_update';

export function IndexReducer (state = { data: [] }, action) {

  switch(action.type) {
    case ACTION_BULK_UPDATE:
      const rows = action.payload;

      if (rows && rows.length) {
        let lastDate = new Date(rows[0].date);
        let values = [];
        let chunks = [];

        rows.map((row) => {
          let date = new Date(row.date);
          if (date.getTime() - lastDate.getTime() > intervalMinutes * 60000) {
            // Положим интервал в хранилище
            chunks.push({
              start: lastDate,
              values: values
            });

            // Сбрасываем значения
            lastDate = date;
            values = [];
          }

          // Добавим в интервал новое значение CO2
          values.push(parseInt(row.co2));
        });

        return Object.assign({}, state, { data: chunks });
      }

      break;

    case ACTION_SINGLE_UPDATE:
      const date  = new Date(action.payload.date);
      const value = parseInt(action.payload.value);

      let chunks = [];
      const lastChunk = state.data.pop();

      if (date.getTime() - lastChunk.start.getTime() > intervalMinutes * 60000) {
        // Прежде чем положить новый чанк, удалим самый первый. Таким образом реализуем "очередь"
        state.data.shift();

        // Положим новый интервал в хранилище чанков
        chunks = state.data.concat(lastChunk, {
          start: date,
          values: [value]
        });
      } else {
        lastChunk.values.push(value);
        chunks = state.data.concat(lastChunk);
      }

      console.log('chunks', chunks.length);

      return Object.assign({}, state, { data: chunks });
    default:
      return state;
  }
}
