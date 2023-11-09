const Transaction = require('../modal/transaction.js');
const User = require('../modal/user.js');
const excel = require('exceljs');

const transactionsController = {
    downloadTransactions: async (req, res) => {
        Transaction.find({}).lean().exec().then(results => {
            const transactions = results;
            console.log("Download request received.");
            if (transactions && transactions.length > 0) {
                let workbook = new excel.Workbook();
                const sheet = workbook.addWorksheet("transactions");
                sheet.columns = [
                    {header: "DATE", key: "date", width: 30},
                    {header: "BRANCH", key: "branch", width: 30},
                    {header: "NAME OF CUSTOMER", key: "name", width: 30},
                    {header: "C-SERIES", key: "series", width: 30},
                    {header: "OS", key: "os", width: 30},
                    {header: "C-INVOICE", key: "invoice", width: 30},
                    {header: "SELLER", key: "seller", width: 30},
                    {header: "ASSEMBLER", key: "assembler", width: 30},
                    {header: "TOTAL", key: "total", width: 30},
                    {header: "VAT SALE", key: "vatsale", width: 30},
                    {header: "VAT AMOUNT", key: "vatamount", width: 30},
                ];

                // Set fill color and font color for column headers
                sheet.getRow(1).eachCell((cell) => {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'ff0c2075' }, 
                    };
                    cell.font = {
                        bold: true,
                        color: { argb: 'ffffffff' }, 
                    };
                });

                transactions.forEach((value) => {
                    sheet.addRow({
                        date: value.date,
                        branch: value.branch,
                        name: value.name,
                        series: value.series,
                        os: value.os,
                        invoice: value.invoice,
                        seller: value.seller,
                        assembler: value.assembler,
                        total: value.total,
                        vatsale: value.vatsale,
                        vatamount: value.vatamount 
                    });
                });

                // Center align all cells in the sheet
                sheet.eachRow((row, rowNumber) => {
                    row.alignment = { vertical: 'middle', horizontal: 'center' };
                });

                res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                res.setHeader("Content-Disposition", "attachment;filename=" + "transactions.xlsx");
                workbook.xlsx.write(res);
            } 
            else {
                res.send("No transactions data found");
                res.sendStatus(404);
            }
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    },

    postTransaction: async (req, res) => {
        const { date, branch, name, series, os, invoice, seller, assembler, total, vatsale, vatamount} = req.body;
        const newTransaction = new Transaction ({
            date, branch, name, series, os, invoice, seller, assembler, total, vatsale, vatamount
        });

        newTransaction.save().then(()=>{
            res.send({success: true});
        }).catch(err => {
            res.status(500).send({success: false});
        });
    },

    filterTransaction: async (req, res) => {
        console.log("Filtering...");
        console.log(req.session.passport.user);
        try {
            let user = await User.findById(req.session.passport.user);
            let fromDate = req.query.from_date; 
            let toDate = req.query.to_date; 

            // Find transactions within the date range
            let transactions = await Transaction.find({
                date: {
                    $gte: fromDate, // Filter transactions with dates greater than or equal to fromDate
                    $lte: toDate  // Filter transactions with dates less than or equal to toDate
                }
            });

            let transactionArray = transactions.map(transaction => {
                return {
                    date: transaction.date,
                    branch: transaction.branch,
                    name: transaction.name,
                    series: transaction.series,
                    os: transaction.os,
                    invoice: transaction.invoice,
                    seller: transaction.seller,
                    assembler: transaction.assembler,
                    total: transaction.total,
                    vatsale: transaction.vatsale,
                    vatamount: transaction.vatamount 
                };
            });

            transactionArray.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });

            if (transactionArray.length <= 0) {
                transactionArray = 
                    [{ date: "no data", branch: "no data", name: "no data", series: 0, os: 0, 
                    invoice: 0, seller: "no data", assembler: "no data", total: 0, vatsale: 0, vatamount: 0 }];
            }

            console.log(transactionArray);

            res.render('home', {
                title: "Dashboard",
                name: user.name,
                transactions: transactionArray,
                layout: "dashboard"
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = transactionsController;