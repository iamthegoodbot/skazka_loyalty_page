var data = [
    {"year": 2014, "department": "NY", "brand": "Toyota", "model": "Camry", "type": "sedan", "price": "27000"},
    {"year": 2014, "department": "Moscow", "brand": "Toyota", "model": "Camry", "type": "sedan", "price": "27000"},
    {"year": 2014, "department": "Tokyo", "brand": "Toyota", "model": "Corolla", "type": "sedan", "price": "18000"},
    {"year": 2014, "department": "NY", "brand": "Toyota", "model": "Rav4", "type": "suv", "price": "30000"},
    {"year": 2014, "department": "Moscow", "brand": "Toyota", "model": "Highlander", "type": "suv", "price": "35000"},
    {"year": 2014, "department": "Tokyo", "brand": "Toyota", "model": "Rav4", "type": "suv", "price": "30000"},
    {"year": 2015, "department": "NY", "brand": "Toyota", "model": "Camry", "type": "sedan", "price": "27000"},
    {"year": 2015, "department": "Moscow", "brand": "Toyota", "model": "Camry", "type": "sedan", "price": "27000"},
    {"year": 2015, "department": "Tokyo", "brand": "Toyota", "model": "Corolla", "type": "sedan", "price": "18000"},
    {"year": 2015, "department": "Tokyo", "brand": "Toyota", "model": "Corolla", "type": "sedan", "price": "18000"},
    {"year": 2015, "department": "NY", "brand": "Toyota", "model": "Rav4", "type": "suv", "price": "30000"},
    {"year": 2015, "department": "NY", "brand": "Toyota", "model": "Rav4", "type": "suv", "price": "30000"},
    {"year": 2015, "department": "Moscow", "brand": "Toyota", "model": "Highlander", "type": "suv", "price": "35000"},
    {"year": 2015, "department": "Tokyo", "brand": "Toyota", "model": "Rav4", "type": "suv", "price": "30000"},
    {"year": 2015, "department": "Tokyo", "brand": "Toyota", "model": "Rav4", "type": "suv", "price": "30000"},
    {"year": 2016, "department": "NY", "brand": "Toyota", "model": "Camry", "type": "sedan", "price": "27000"},
    {"year": 2016, "department": "Moscow", "brand": "Toyota", "model": "Camry", "type": "sedan", "price": "27000"},
    {"year": 2016, "department": "Tokyo", "brand": "Toyota", "model": "Corolla", "type": "sedan", "price": "18000"},
    {"year": 2016, "department": "NY", "brand": "Toyota", "model": "Rav4", "type": "suv", "price": "30000"},
    {"year": 2016, "department": "Moscow", "brand": "Toyota", "model": "Highlander", "type": "suv", "price": "35000"},
    {"year": 2016, "department": "Tokyo", "brand": "Toyota", "model": "Rav4", "type": "suv", "price": "30000"},
    {"year": 2016, "department": "NY", "brand": "Toyota", "model": "Camry", "type": "sedan", "price": "27000"},
    {"year": 2016, "department": "Moscow", "brand": "Toyota", "model": "Camry", "type": "sedan", "price": "27000"},
    {"year": 2016, "department": "Tokyo", "brand": "Toyota", "model": "Corolla", "type": "sedan", "price": "18000"},
    {"year": 2016, "department": "NY", "brand": "Toyota", "model": "Rav4", "type": "suv", "price": "30000"},
    {"year": 2016, "department": "Moscow", "brand": "Toyota", "model": "Highlander", "type": "suv", "price": "35000"},
    {"year": 2016, "department": "Tokyo", "brand": "Toyota", "model": "Rav4", "type": "suv", "price": "30000"},
    {"year": 2014, "department": "NY", "brand": "Honda", "model": "Accord", "type": "sedan", "price": "24000"},
    {"year": 2014, "department": "Moscow", "brand": "Honda", "model": "Accord", "type": "sedan", "price": "24000"},
    {"year": 2014, "department": "Tokyo", "brand": "Honda", "model": "Civic", "type": "sedan", "price": "16000"},
    {"year": 2014, "department": "NY", "brand": "Honda", "model": "CR-V", "type": "suv", "price": "32000"},
    {"year": 2014, "department": "Moscow", "brand": "Honda", "model": "CR-V", "type": "suv", "price": "32000"},
    {"year": 2014, "department": "Tokyo", "brand": "Honda", "model": "Pilot", "type": "suv", "price": "38000"},
    {"year": 2015, "department": "NY", "brand": "Honda", "model": "Accord", "type": "sedan", "price": "24000"},
    {"year": 2015, "department": "Moscow", "brand": "Honda", "model": "Accord", "type": "sedan", "price": "24000"},
    {"year": 2015, "department": "Tokyo", "brand": "Honda", "model": "Civic", "type": "sedan", "price": "16000"},
    {"year": 2015, "department": "Moscow", "brand": "Honda", "model": "Civic", "type": "sedan", "price": "16000"},
    {"year": 2015, "department": "Tokyo", "brand": "Honda", "model": "Civic", "type": "sedan", "price": "16000"},
    {"year": 2015, "department": "NY", "brand": "Honda", "model": "CR-V", "type": "suv", "price": "32000"},
    {"year": 2015, "department": "Moscow", "brand": "Honda", "model": "CR-V", "type": "suv", "price": "32000"},
    {"year": 2015, "department": "NY", "brand": "Honda", "model": "Pilot", "type": "suv", "price": "38000"},
    {"year": 2015, "department": "Tokyo", "brand": "Honda", "model": "Pilot", "type": "suv", "price": "38000"},
    {"year": 2016, "department": "NY", "brand": "Honda", "model": "Accord", "type": "sedan", "price": "24000"},
    {"year": 2016, "department": "Moscow", "brand": "Honda", "model": "Accord", "type": "sedan", "price": "24000"},
    {"year": 2016, "department": "Tokyo", "brand": "Honda", "model": "Civic", "type": "sedan", "price": "16000"},
    {"year": 2016, "department": "Moscow", "brand": "Honda", "model": "Civic", "type": "sedan", "price": "16000"},
    {"year": 2016, "department": "Tokyo", "brand": "Honda", "model": "Civic", "type": "sedan", "price": "16000"},
    {"year": 2016, "department": "NY", "brand": "Honda", "model": "CR-V", "type": "suv", "price": "32000"},
    {"year": 2016, "department": "Moscow", "brand": "Honda", "model": "CR-V", "type": "suv", "price": "32000"},
    {"year": 2016, "department": "NY", "brand": "Honda", "model": "Pilot", "type": "suv", "price": "38000"},
    {"year": 2016, "department": "Tokyo", "brand": "Honda", "model": "Pilot", "type": "suv", "price": "38000"},
    {"year": 2016, "department": "NY", "brand": "Honda", "model": "Accord", "type": "sedan", "price": "24000"},
    {"year": 2016, "department": "Moscow", "brand": "Honda", "model": "Accord", "type": "sedan", "price": "24000"},
    {"year": 2016, "department": "Tokyo", "brand": "Honda", "model": "Civic", "type": "sedan", "price": "16000"},
    {"year": 2016, "department": "Moscow", "brand": "Honda", "model": "Civic", "type": "sedan", "price": "16000"},
    {"year": 2016, "department": "Tokyo", "brand": "Honda", "model": "Civic", "type": "sedan", "price": "16000"},
    {"year": 2016, "department": "NY", "brand": "Honda", "model": "CR-V", "type": "suv", "price": "32000"},
    {"year": 2016, "department": "Moscow", "brand": "Honda", "model": "CR-V", "type": "suv", "price": "32000"},
    {"year": 2016, "department": "NY", "brand": "Honda", "model": "Pilot", "type": "suv", "price": "38000"},
    {"year": 2016, "department": "Tokyo", "brand": "Honda", "model": "Pilot", "type": "suv", "price": "38000"},
    {"year": 2014, "department": "NY", "brand": "Nissan", "model": "Teana", "type": "sedan", "price": "30000"},
    {"year": 2014, "department": "Moscow", "brand": "Nissan", "model": "Teana", "type": "sedan", "price": "30000"},
    {"year": 2014, "department": "Tokyo", "brand": "Nissan", "model": "Pulsar", "type": "sedan", "price": "17000"},
    {"year": 2014, "department": "NY", "brand": "Nissan", "model": "X-Trail", "type": "suv", "price": "32000"},
    {"year": 2014, "department": "Moscow", "brand": "Nissan", "model": "X-Trail", "type": "suv", "price": "32000"},
    {"year": 2014, "department": "Tokyo", "brand": "Nissan", "model": "Pathfinder", "type": "suv", "price": "37500"},
    {"year": 2014, "department": "Tokyo", "brand": "Nissan", "model": "Pulsar", "type": "sedan", "price": "17000"},
    {"year": 2014, "department": "NY", "brand": "Nissan", "model": "X-Trail", "type": "suv", "price": "32000"},
    {"year": 2014, "department": "Moscow", "brand": "Nissan", "model": "X-Trail", "type": "suv", "price": "32000"},
    {"year": 2015, "department": "NY", "brand": "Nissan", "model": "Teana", "type": "sedan", "price": "30000"},
    {"year": 2015, "department": "NY", "brand": "Nissan", "model": "Teana", "type": "sedan", "price": "30000"},
    {"year": 2015, "department": "Moscow", "brand": "Nissan", "model": "Teana", "type": "sedan", "price": "30000"},
    {"year": 2015, "department": "Tokyo", "brand": "Nissan", "model": "Pulsar", "type": "sedan", "price": "17000"},
    {"year": 2015, "department": "Moscow", "brand": "Nissan", "model": "Pulsar", "type": "sedan", "price": "17000"},
    {"year": 2015, "department": "Tokyo", "brand": "Nissan", "model": "Pulsar", "type": "sedan", "price": "17000"},
    {"year": 2015, "department": "NY", "brand": "Nissan", "model": "X-Trail", "type": "suv", "price": "32000"},
    {"year": 2015, "department": "Moscow", "brand": "Nissan", "model": "X-Trail", "type": "suv", "price": "32000"},
    {"year": 2015, "department": "NY", "brand": "Nissan", "model": "Pathfinder", "type": "suv", "price": "37500"},
    {"year": 2015, "department": "NY", "brand": "Nissan", "model": "Pathfinder", "type": "suv", "price": "37500"},
    {"year": 2015, "department": "Tokyo", "brand": "Nissan", "model": "Pathfinder", "type": "suv", "price": "37500"},
    {"year": 2015, "department": "Tokyo", "brand": "Nissan", "model": "Pathfinder", "type": "suv", "price": "37500"},
    {"year": 2015, "department": "Tokyo", "brand": "Nissan", "model": "Pathfinder", "type": "suv", "price": "37500"},
    {"year": 2016, "department": "NY", "brand": "Nissan", "model": "Teana", "type": "sedan", "price": "30000"},
    {"year": 2016, "department": "Moscow", "brand": "Nissan", "model": "Teana", "type": "sedan", "price": "30000"},
    {"year": 2016, "department": "Tokyo", "brand": "Nissan", "model": "Pulsar", "type": "sedan", "price": "17000"},
    {"year": 2016, "department": "Moscow", "brand": "Nissan", "model": "Pulsar", "type": "sedan", "price": "17000"},
    {"year": 2016, "department": "Tokyo", "brand": "Nissan", "model": "Pulsar", "type": "sedan", "price": "17000"},
    {"year": 2016, "department": "NY", "brand": "Nissan", "model": "X-Trail", "type": "suv", "price": "32000"},
    {"year": 2016, "department": "Moscow", "brand": "Nissan", "model": "X-Trail", "type": "suv", "price": "32000"},
    {"year": 2016, "department": "NY", "brand": "Nissan", "model": "Pathfinder", "type": "suv", "price": "37500"},
    {"year": 2016, "department": "Tokyo", "brand": "Nissan", "model": "Pathfinder", "type": "suv", "price": "37500"},
    {"year": 2016, "department": "NY", "brand": "Nissan", "model": "Teana", "type": "sedan", "price": "30000"},
    {"year": 2016, "department": "Moscow", "brand": "Nissan", "model": "Teana", "type": "sedan", "price": "30000"},
    {"year": 2016, "department": "Moscow", "brand": "Nissan", "model": "Pulsar", "type": "sedan", "price": "17000"},
    {"year": 2016, "department": "Tokyo", "brand": "Nissan", "model": "Pulsar", "type": "sedan", "price": "17000"},
    {"year": 2016, "department": "NY", "brand": "Nissan", "model": "X-Trail", "type": "suv", "price": "32000"},
    {"year": 2016, "department": "Moscow", "brand": "Nissan", "model": "X-Trail", "type": "suv", "price": "32000"},
    {"year": 2016, "department": "NY", "brand": "Nissan", "model": "Pathfinder", "type": "suv", "price": "37500"},
    {"year": 2016, "department": "Tokyo", "brand": "Nissan", "model": "Pathfinder", "type": "suv", "price": "37500"},
    {"year": 2016, "department": "NY", "brand": "Nissan", "model": "Teana", "type": "sedan", "price": "30000"},
    {"year": 2016, "department": "Moscow", "brand": "Nissan", "model": "Teana", "type": "sedan", "price": "30000"},
    {"year": 2016, "department": "Tokyo", "brand": "Nissan", "model": "Pulsar", "type": "sedan", "price": "17000"},
    {"year": 2016, "department": "Moscow", "brand": "Nissan", "model": "Pulsar", "type": "sedan", "price": "17000"},
    {"year": 2016, "department": "Tokyo", "brand": "Nissan", "model": "Pulsar", "type": "sedan", "price": "17000"},
    {"year": 2016, "department": "NY", "brand": "Nissan", "model": "X-Trail", "type": "suv", "price": "32000"},
    {"year": 2016, "department": "Moscow", "brand": "Nissan", "model": "X-Trail", "type": "suv", "price": "32000"},
    {"year": 2016, "department": "NY", "brand": "Nissan", "model": "Pathfinder", "type": "suv", "price": "37500"},
    {"year": 2016, "department": "Tokyo", "brand": "Nissan", "model": "Pathfinder", "type": "suv", "price": "37500"}
]

var sum = function (curr_item, prev_value) { if(!prev_value) prev_value = 0; prev_value += +curr_item.price; return prev_value; };
var count = function (curr_item, prev_value) { if(!prev_value) prev_value = 0; prev_value += 1; return prev_value; };

var table1_cols = ['year', 'department'];
var table2_cols = ['year', 'department'];

var table1_rows = ['brand', 'type'];
var table2_rows = ['brand', 'model'];

var table1 = statistics(table1_cols, table1_rows, sum);
var table2 = statistics(table2_cols, table2_rows, count);

function statistics(cols, rows, value) {
    var k = data.reduce(
        (prev, curr, index) => {
            if (!prev)
                prev = {};
console.log(curr_cols)
            var curr_cols = Object.keys(curr).filter(prop => cols.indexOf(prop) != -1).map(prop => curr[prop]);
            var curr_rows = Object.keys(curr).filter(prop => rows.indexOf(prop) != -1).map(prop => curr[prop]);
console.log(curr_cols)
            var cols_index = curr_cols.join('_');
            var rows_index = curr_rows.join('_');

            var key = cols_index + ':' + rows_index;
            var keys = Object.keys(prev);

            if(keys.indexOf(key) == -1) {
                prev[key] = value(curr);
            } else {
                prev[key] = value(curr, prev[key]);
            }

            return prev;
        }, {});
    
    return k;
}
