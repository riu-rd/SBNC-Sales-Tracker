document.addEventListener("DOMContentLoaded", (e) => {
    const addBtn = document.getElementById("addBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    const entryForm = document.getElementById("addForm");
    const entryContainer = document.getElementById("addContainer");

    addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        entryContainer.style.display = 'flex';
    });

    entryForm?.addEventListener("submit", async () => {

        const formData = {
            date: entryForm.elements.addDate.value,
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

    cancelBtn?.addEventListener("click", (e) => {
        entryContainer.style.display = 'none';
    });
});