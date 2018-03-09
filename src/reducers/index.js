import _ from 'lodash';

// За какой промежуток усредняем данные
const intervalMinutes = 1;

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

        // Из полученных интервалов сформируем данные для графика
        const plotData = chunks.map((chunk) => {
          return [
            chunk.start.getHours() + ':' + chunk.start.getMinutes(),
            Math.round(_.sum(chunk.values) / chunk.values.length)
          ]
        });

        return Object.assign({}, state, { data: plotData });
      }

      break;

    case ACTION_SINGLE_UPDATE:
      let newData = state.data.concat([
        [action.payload.label, action.payload.value]
      ]);

      // Делаем ограничение по размеру массива
      if (newData.length > 1000 )  {
        newData.shift();
      }

      return Object.assign({}, state, { data: newData });
    default:
      return state;
  }
}
