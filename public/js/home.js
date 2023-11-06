document.addEventListener("DOMContentLoaded", (e) => {
    const addBtn = document.getElementById("addBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const entryForm = document.getElementById("addForm");
    const entryContainer = document.getElementById("addContainer");
    const downloadBtn = document.getElementById("downloadBtn");
    const downloadLink = document.getElementById("downloadLink");
    
    //Add Button Event
    addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        entryContainer.style.display = 'flex';
    });

    entryForm?.addEventListener("submit", async () => {

        const formData = {
            date: entryForm.elements.addDate.value,
            branch: entryForm.elements.addBranch.value,
            name: entryForm.elements.addName.value,
            series: entryForm.elements.addSeries.value,
            os: entryForm.elements.addOS.value,
            invoice: entryForm.elements.addInvoice.value,
            seller: entryForm.elements.addSeller.value,
            assembler: entryForm.elements.addAssembler.value,
            total: entryForm.elements.addTotal.value,
            vatsale: entryForm.elements.addVatsale.value,
            vatamount: entryForm.elements.addVatamount.value
        };

        fetch('/post-transaction', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		})
		.then(res => {
			if (!res.ok) {
				throw new Error('Error! Form submission failed');
			}
			return res.json();
		})
		.catch(error => {
			console.error(error);
		});
    });

    //Cancel Button in Data Entry Form event
    cancelBtn?.addEventListener("click", (e) => {
        entryContainer.style.display = 'none';
    });

    //Download Button Event
    downloadBtn?.addEventListener("click", (e) => {
        e.preventDefault();

        fetch("/download-transactions", {
            method: "GET",
        }).then((response) => {
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error('Download request failed');
            }
        }).then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'transactions.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(err => {
            console.error(err);
        });
    });
});