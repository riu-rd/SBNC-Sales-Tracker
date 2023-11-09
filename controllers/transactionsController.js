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

                res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                res.setHeader("Content-Disposition", "attachment;filename=" + "transactions.xlsx");
                workbook.xlsx.write(res);
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
    }
}

module.exports = transactionsController;