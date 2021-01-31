
const { readCSVFile, fetchContacts, fetchListing, deleteFiles,
    calculatedistribution, calculateAvgPriceContacted, topContactedperMonth } = require('../helper/helper');

module.exports = {
    manageFiles: async (files) => {
        try {
            let listingData = await readCSVFile(files[1].path)
            let contentData = await readCSVFile(files[0].path)
            let listingLen = listingData.rows.length - 1;

            let contacts_arr = fetchContacts(contentData.rows)
            let { avgPrices_arr, makeDistrib } = fetchListing(listingData.rows)
            let distribution_arr = calculatedistribution(makeDistrib, listingLen);
            let avgPriceContacted = calculateAvgPriceContacted(contacts_arr, listingData.rows)

            let topContacted = topContactedperMonth(contentData.rows, listingData.rows, 5, 2020)

            deleteFiles(files)
            return ({ error: false, data: { avgPrices_arr, distribution_arr, avgPriceContacted, topContacted } })

        } catch (error) {
            return ({ error: error, data: {} })

        }

    },

}
