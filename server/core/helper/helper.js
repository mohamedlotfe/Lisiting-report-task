const parse = require('csv-parse')
const fs = require('fs')

exports.readCSVFile = function (sourceFilePath, headerOnly = false) {
    return new Promise((resolve, reject) => {
        try {
            var source = fs.createReadStream(sourceFilePath);

            const parser = (headerOnly)
                ? parse({ delimiter: ',', from_line: 1, to_line: 1 })
                : parse({ delimiter: ',' });
            const output = [];

            // Use the readable stream api
            parser.on('readable', function () {
                let record
                while (record = parser.read())
                    output.push(record)
            });
            // Catch any error
            parser.on('error', function (err) {
                return reject({ error: true, rows: err.message })
            });
            // When we are done
            parser.on('end', function () {
                return resolve({ error: false, rows: output })
            })
            source.pipe(parser);

        } catch (error) {
            reject({ error: true, rows: error })
        }
    })
}
exports.calculatedistribution = function (makeDistrib, listingLen) {
    let distribution = [];
    for (const [key, value] of makeDistrib) {
        distribution.push({ make: key, percent: calculatePercent(value, listingLen) })
    }
    distribution.sort(dynamicSort("-percent"))
    return distribution;
}
exports.calculateAvgPriceContacted = function (contacts, listing, perc = 0.3) {
    let AvgPriceContacted = 0;
    contacts.splice(Number(contacts.length * perc));

    let interSection = getIntersection(contacts, listing)
    for (let i = 0; i < interSection.length; i++) {
        AvgPriceContacted += Number(interSection[i][2])
    }
    return [{ price: AvgPriceContacted }];
}
exports.topContactedperMonth = function (contacts, listing, month, year) {
    let contacts_per_month = exports.fetchContacts(contacts, { month, year }), top_contacted = [];

    for (let i = 0; i < Number(contacts_per_month.length); i++) {
        for (let j = 0; j < listing.length; j++) {
            if (listing[j][0] == contacts_per_month[i].id) {
                top_contacted.push({
                    id: listing[j][0],
                    make: listing[j][1],
                    price: listing[j][2],
                    mileage: Number(Number(listing[j][3]) * 1.6),
                    amount: contacts_per_month[i].count
                })
            }

        }
    }
    return top_contacted;

}
exports.fetchListing = function (rows) {
    let avgPrices = new Map(), makeDistrib = new Map()

    for (let i = 1; i < rows.length; i++) {
        let make = rows[i][1], price = Number(rows[i][2]), type = rows[i][4];
        let typePrice = avgPrices.get(type), maker = makeDistrib.get(make);

        avgPrices.set(type, typePrice ? typePrice += price : price)
        makeDistrib.set(make, maker ? maker += 1 : 1)

    }
    let avgPrices_arr = Array.from(avgPrices, ([type, count]) => ({ type, count })) || [];

    return { avgPrices_arr, makeDistrib }
}
exports.fetchContacts = function (rows, contact_date = null) {
    let listIdsMap = new Map()

    for (let i = 1; i < rows.length; i++) {
        let list_id = rows[i][0], list_date = new Date(Number(rows[i][1]))
        let count = listIdsMap.get(list_id);

        if (!contact_date) {
            listIdsMap.set(list_id, count ? count += 1 : 1)
        }
        else if (checkDate(contact_date, list_date)) {
            listIdsMap.set(list_id, count ? count += 1 : 1)
        }
    }
    let contacts_arr = Array.from(listIdsMap, ([id, count]) => ({ id, count })) || [];
    contacts_arr.sort(dynamicSort("-count"))

    if (contact_date) contacts_arr.splice(5)
    return contacts_arr;
}
exports.deleteFiles = function (files) {
    files.forEach(file => {
        fs.unlinkSync(file.path)
    });
}
function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
function calculatePercent(percent, num) {
    return Number(((percent / num) * 100).toFixed(2));
}
function checkDate(contact_date, list_date) {
    if (!contact_date || !list_date)
        return false
    if (list_date.getMonth() !== contact_date.month || list_date.getFullYear() !== contact_date.year)
        return false
    return true

}
function getIntersection(contacts, listing) {
    let interSection = [];
    for (let i = 0; i < Number(contacts.length); i++) {
        for (let j = 0; j < listing.length; j++) {
            if (listing[j][0] == contacts[i].id) {
                interSection.push(listing[j])
            }
        }
    }
    return interSection;
}


