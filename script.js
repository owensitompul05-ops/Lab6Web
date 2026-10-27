/**
 * ===================================================================
 * PRAKTIKUM 6: JAVASCRIPT DOM DAN EVENT HANDLING
 * Nama   : Margent Ouwen Sitompul
 * NIM    : 312510463
 * Kelas  : Teknik Informatika • Pemrograman Web Pertemuan 7
 * ===================================================================
 */

document.addEventListener("DOMContentLoaded", function () {
  console.log("=== Praktikum 6: DOM & Event Handling Loaded ===");
  console.log("Mahasiswa: Margent Ouwen Sitompul | NIM: 312510463");

  // =================================================================
  // 0. TAB NAVIGATION HANDLER
  // =================================================================
  const tabButtons = document.querySelectorAll(".nav-tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetTabId = button.getAttribute("data-tab");

      // Update button states
      tabButtons.forEach(btn => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-selected", "true");

      // Update tab pane visibility
      tabPanes.forEach(pane => {
        if (pane.id === targetTabId) {
          pane.classList.add("active");
        } else {
          pane.classList.remove("active");
        }
      });
    });
  });

  // =================================================================
  // LATIHAN 1: MENGUBAH TEKS DENGAN DOM
  // =================================================================
  const judul = document.getElementById("judul");
  const pesan = document.getElementById("pesan");

  if (judul && pesan) {
    judul.textContent = "Belajar JavaScript DOM";
    pesan.textContent = "Konten berhasil diubah oleh JavaScript.";
  }

  // =================================================================
  // LATIHAN 2: EVENT CLICK
  // =================================================================
  const tombolAksi = document.getElementById("tombolAksi");

  if (tombolAksi && pesan) {
    tombolAksi.addEventListener("click", function () {
      pesan.textContent = "Tombol diklik pada " + new Date().toLocaleTimeString();
    });
  }

  // =================================================================
  // LATIHAN 3: MENGUBAH KELAS DAN GAYA CSS
  // =================================================================
  const tombolGaya = document.getElementById("tombolGaya");
  const teksGaya = document.getElementById("teksGaya");

  if (tombolGaya && teksGaya) {
    tombolGaya.addEventListener("click", function () {
      teksGaya.classList.toggle("highlight");
      teksGaya.classList.toggle("teks-besar");
    });
  }

  // =================================================================
  // LATIHAN 4: EVENT INPUT DAN PENGHITUNG KARAKTER
  // =================================================================
  const namaInput = document.getElementById("namaInput");
  const jumlahKarakter = document.getElementById("jumlahKarakter");
  const charMeterFill = document.getElementById("charMeterFill");

  if (namaInput && jumlahKarakter) {
    namaInput.addEventListener("input", function () {
      const len = namaInput.value.length;
      jumlahKarakter.textContent = len;

      if (charMeterFill) {
        const percentage = Math.min((len / 40) * 100, 100);
        charMeterFill.style.width = percentage + "%";
        if (percentage >= 90) {
          charMeterFill.style.backgroundColor = "var(--danger)";
        } else if (percentage >= 70) {
          charMeterFill.style.backgroundColor = "var(--warning)";
        } else {
          charMeterFill.style.backgroundColor = "var(--primary)";
        }
      }
    });
  }

  // =================================================================
  // LATIHAN 5: VALIDASI FORM PENDAFTARAN
  // =================================================================
  const form = document.getElementById("formPendaftaran");
  const pesanForm = document.getElementById("pesanForm");

  if (form && pesanForm) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nama = document.getElementById("nama").value.trim();
      const email = document.getElementById("email").value.trim();
      const usiaInput = document.getElementById("usia").value;
      const usia = Number(usiaInput);
      const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (nama === "") {
        pesanForm.textContent = "Nama wajib diisi.";
        pesanForm.className = "feedback-box feedback-danger";
      } else if (!polaEmail.test(email)) {
        pesanForm.textContent = "Masukkan email yang valid.";
        pesanForm.className = "feedback-box feedback-danger";
      } else if (usiaInput === "" || !Number.isInteger(usia) || usia < 17 || usia > 100) {
        pesanForm.textContent = "Usia harus berupa bilangan bulat 17–100.";
        pesanForm.className = "feedback-box feedback-danger";
      } else {
        pesanForm.textContent = "Validasi berhasil. Form siap diproses.";
        pesanForm.className = "feedback-box feedback-success";
        form.reset();
      }
    });

    // Helper: 5 Skenario Pengujian Cepat
    const btnEmpty = document.getElementById("test-empty");
    const btnNoName = document.getElementById("test-no-name");
    const btnBadEmail = document.getElementById("test-bad-email");
    const btnUnderAge = document.getElementById("test-under-age");
    const btnValid = document.getElementById("test-valid");

    if (btnEmpty) {
      btnEmpty.addEventListener("click", () => {
        form.reset();
        form.requestSubmit();
      });
    }

    if (btnNoName) {
      btnNoName.addEventListener("click", () => {
        document.getElementById("nama").value = "";
        document.getElementById("email").value = "margent@gmail.com";
        document.getElementById("usia").value = "21";
        form.requestSubmit();
      });
    }

    if (btnBadEmail) {
      btnBadEmail.addEventListener("click", () => {
        document.getElementById("nama").value = "Margent Ouwen";
        document.getElementById("email").value = "bukan_email_valid";
        document.getElementById("usia").value = "21";
        form.requestSubmit();
      });
    }

    if (btnUnderAge) {
      btnUnderAge.addEventListener("click", () => {
        document.getElementById("nama").value = "Margent Ouwen";
        document.getElementById("email").value = "margent@gmail.com";
        document.getElementById("usia").value = "15";
        form.requestSubmit();
      });
    }

    if (btnValid) {
      btnValid.addEventListener("click", () => {
        document.getElementById("nama").value = "Margent Ouwen Sitompul";
        document.getElementById("email").value = "margent.ouwen@student.ac.id";
        document.getElementById("usia").value = "21";
        form.requestSubmit();
      });
    }
  }

  // =================================================================
  // LATIHAN 6: DAFTAR TUGAS SEDERHANA + EKSPERIMEN 1 (HAPUS ITEM)
  // =================================================================
  const inputTugas = document.getElementById("inputTugas");
  const tambahTugas = document.getElementById("tambahTugas");
  const daftarTugas = document.getElementById("daftarTugas");
  const pesanTugas = document.getElementById("pesanTugas");

  function createTodoItem(teks) {
    const item = document.createElement("li");
    item.className = "todo-item";

    const label = document.createElement("span");
    label.textContent = teks + " ";

    const selesai = document.createElement("button");
    selesai.type = "button";
    selesai.className = "btn btn-secondary btn-sm";
    selesai.textContent = "Tandai selesai";

    selesai.addEventListener("click", function () {
      item.classList.toggle("selesai");
      selesai.textContent = item.classList.contains("selesai")
        ? "Batalkan selesai"
        : "Tandai selesai";
    });

    // Eksperimen Mandiri 1: Tombol Hapus Item
    const tombolHapus = document.createElement("button");
    tombolHapus.type = "button";
    tombolHapus.className = "btn btn-danger btn-sm";
    tombolHapus.textContent = "Hapus";

    tombolHapus.addEventListener("click", function () {
      item.remove();
      pesanTugas.textContent = "Tugas \"" + teks + "\" berhasil dihapus.";
      pesanTugas.className = "feedback-box feedback-info";
    });

    const actions = document.createElement("div");
    actions.className = "todo-actions";
    actions.append(selesai, tombolHapus);

    item.append(label, actions);
    return item;
  }

  if (tambahTugas && inputTugas && daftarTugas && pesanTugas) {
    tambahTugas.addEventListener("click", function () {
      const teks = inputTugas.value.trim();

      if (teks === "") {
        pesanTugas.textContent = "Tulis tugas terlebih dahulu.";
        pesanTugas.className = "feedback-box feedback-danger";
        return;
      }

      const item = createTodoItem(teks);
      daftarTugas.appendChild(item);

      inputTugas.value = "";
      pesanTugas.textContent = "Tugas berhasil ditambahkan.";
      pesanTugas.className = "feedback-box feedback-success";
      inputTugas.focus();
    });

    // Tambahkan 2 tugas awal sebagai sampel demo
    daftarTugas.appendChild(createTodoItem("Menyelesaikan Laporan Praktikum 6 Web (DOM & Event)"));
    daftarTugas.appendChild(createTodoItem("Mempersiapkan Presentasi Mini Project Workshop"));
  }

  // =================================================================
  // MINI PROJECT: FORM PENDAFTARAN WORKSHOP INTERAKTIF
  // =================================================================
  const formWorkshop = document.getElementById("formWorkshop");
  const wsNama = document.getElementById("wsNama");
  const wsEmail = document.getElementById("wsEmail");
  const wsSesi = document.getElementById("wsSesi");
  const wsKategori = document.getElementById("wsKategori");
  const wsCatatan = document.getElementById("wsCatatan");
  const wsCharCount = document.getElementById("wsCharCount");
  const btnResetWorkshop = document.getElementById("btnResetWorkshop");

  // Detail elemen Sesi (Eksperimen 3)
  const wsSesiDetail = document.getElementById("wsSesiDetail");
  const wsSesiDesc = document.getElementById("wsSesiDesc");
  const wsSesiSpeaker = document.getElementById("wsSesiSpeaker");
  const wsSesiQuota = document.getElementById("wsSesiQuota");

  // Live Ticket Preview Elements
  const previewNama = document.getElementById("previewNama");
  const previewEmail = document.getElementById("previewEmail");
  const previewSesi = document.getElementById("previewSesi");
  const previewKategori = document.getElementById("previewKategori");
  const previewCatatan = document.getElementById("previewCatatan");
  const ticketBadgeStatus = document.getElementById("ticketBadgeStatus");
  const ticketTimestamp = document.getElementById("ticketTimestamp");

  // Alert Feedback Elements
  const workshopAlertContainer = document.getElementById("workshopAlertContainer");
  const workshopAlertBox = document.getElementById("workshopAlertBox");
  const workshopAlertIcon = document.getElementById("workshopAlertIcon");
  const workshopAlertText = document.getElementById("workshopAlertText");

  // Live Sync on Input: Nama
  if (wsNama) {
    wsNama.addEventListener("input", function () {
      const val = wsNama.value.trim();
      previewNama.textContent = val !== "" ? val : "Margent Ouwen Sitompul";
      
      // Real-time check
      const err = document.getElementById("wsNamaError");
      if (err) {
        if (val.length > 0 && val.length < 3) {
          err.style.display = "block";
        } else {
          err.style.display = "none";
        }
      }
    });
  }

  // Live Sync on Input: Email
  if (wsEmail) {
    wsEmail.addEventListener("input", function () {
      const val = wsEmail.value.trim();
      previewEmail.textContent = val !== "" ? val : "margent.ouwen@student.ac.id";

      const err = document.getElementById("wsEmailError");
      const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (err) {
        if (val.length > 0 && !polaEmail.test(val)) {
          err.style.display = "block";
        } else {
          err.style.display = "none";
        }
      }
    });
  }

  // Live Sync on Change: Dropdown Sesi Workshop (Eksperimen Mandiri 3)
  if (wsSesi) {
    wsSesi.addEventListener("change", function () {
      const selectedOption = wsSesi.options[wsSesi.selectedIndex];

      if (wsSesi.value !== "") {
        previewSesi.textContent = selectedOption.text.trim();
        previewSesi.style.color = "#a5f3fc";

        // Tampilkan info detail sesi (Eksperimen 3)
        if (wsSesiDetail) {
          wsSesiDetail.style.display = "block";
          wsSesiDesc.textContent = selectedOption.getAttribute("data-desc") || "-";
          wsSesiSpeaker.textContent = selectedOption.getAttribute("data-speaker") || "-";
          wsSesiQuota.textContent = selectedOption.getAttribute("data-quota") || "-";
        }
      } else {
        previewSesi.textContent = "Belum memilih sesi workshop";
        previewSesi.style.color = "#fef08a";
        if (wsSesiDetail) wsSesiDetail.style.display = "none";
      }
    });
  }

  // Live Sync on Change: Kategori Peserta
  if (wsKategori) {
    wsKategori.addEventListener("change", function () {
      previewKategori.textContent = wsKategori.value;
    });
  }

  // Live Sync on Input: Catatan & Counter Karakter
  if (wsCatatan && wsCharCount) {
    wsCatatan.addEventListener("input", function () {
      const len = wsCatatan.value.length;
      wsCharCount.textContent = len;
      previewCatatan.textContent = wsCatatan.value.trim() !== ""
        ? '"' + wsCatatan.value.trim() + '"'
        : "(Belum ada catatan)";
    });
  }

  // Form Workshop Submission with Validation
  if (formWorkshop) {
    formWorkshop.addEventListener("submit", function (e) {
      e.preventDefault();

      const nama = wsNama.value.trim();
      const email = wsEmail.value.trim();
      const sesi = wsSesi.value;
      const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let errors = [];

      // Validasi Eksperimen 2: Nama minimal 3 karakter
      if (nama === "") {
        errors.push("Nama lengkap wajib diisi.");
      } else if (nama.length < 3) {
        errors.push("Nama minimal harus terdiri dari 3 karakter (Eksperimen Mandiri 2).");
      }

      // Validasi Email
      if (email === "") {
        errors.push("Alamat email wajib diisi.");
      } else if (!polaEmail.test(email)) {
        errors.push("Alamat email tidak valid (harus mengandung '@' dan domain).");
      }

      // Validasi Sesi
      if (sesi === "") {
        errors.push("Silakan pilih sesi workshop yang diminati.");
      }

      // Tampilkan feedback kesalahan atau sukses
      workshopAlertContainer.style.display = "block";

      if (errors.length > 0) {
        workshopAlertBox.className = "feedback-box feedback-danger";
        workshopAlertIcon.textContent = "⚠️";
        workshopAlertText.innerHTML = "<strong>Pendaftaran Gagal:</strong><br>• " + errors.join("<br>• ");
        ticketBadgeStatus.textContent = "TIDAK VALID";
        ticketBadgeStatus.style.background = "#ef4444";
        ticketBadgeStatus.style.color = "#ffffff";
      } else {
        workshopAlertBox.className = "feedback-box feedback-success";
        workshopAlertIcon.textContent = "🎉";
        workshopAlertText.innerHTML = "<strong>Selamat! Pendaftaran Berhasil:</strong><br>Tiket pendaftaran workshop Anda atas nama <strong>" + nama + "</strong> telah aktif dan terverifikasi.";
        
        ticketBadgeStatus.textContent = "TERKONFIRMASI";
        ticketBadgeStatus.style.background = "#10b981";
        ticketBadgeStatus.style.color = "#ffffff";
        ticketTimestamp.textContent = "TERDAFTAR: " + new Date().toLocaleTimeString();
      }
    });
  }

  // Reset Button Handler
  if (btnResetWorkshop) {
    btnResetWorkshop.addEventListener("click", function () {
      formWorkshop.reset();
      previewNama.textContent = "Margent Ouwen Sitompul";
      previewEmail.textContent = "margent.ouwen@student.ac.id";
      previewSesi.textContent = "Belum memilih sesi workshop";
      previewSesi.style.color = "#fef08a";
      previewKategori.textContent = "Mahasiswa";
      previewCatatan.textContent = "(Belum ada catatan)";
      wsCharCount.textContent = "0";
      if (wsSesiDetail) wsSesiDetail.style.display = "none";
      workshopAlertContainer.style.display = "none";

      const errNama = document.getElementById("wsNamaError");
      const errEmail = document.getElementById("wsEmailError");
      if (errNama) errNama.style.display = "none";
      if (errEmail) errEmail.style.display = "none";

      ticketBadgeStatus.textContent = "DRAFT";
      ticketBadgeStatus.style.background = "#10b981";
      ticketBadgeStatus.style.color = "#064e3b";
      ticketTimestamp.textContent = "ID: WS-312510463";
    });
  }

  // =================================================================
  // EKSPERIMEN MANDIRI 2: VALIDASI NAMA MINIMAL 3 KARAKTER DEMO
  // =================================================================
  const demoExpNama = document.getElementById("demoExpNama");
  const demoExpNamaPesan = document.getElementById("demoExpNamaPesan");

  if (demoExpNama && demoExpNamaPesan) {
    demoExpNama.addEventListener("input", function () {
      const val = demoExpNama.value.trim();
      if (val === "") {
        demoExpNamaPesan.textContent = "Ketik nama minimal 3 karakter...";
        demoExpNamaPesan.className = "feedback-box feedback-info";
      } else if (val.length < 3) {
        demoExpNamaPesan.textContent = "❌ Belum valid: Nama baru " + val.length + " karakter (kurang " + (3 - val.length) + " lagi).";
        demoExpNamaPesan.className = "feedback-box feedback-danger";
      } else {
        demoExpNamaPesan.textContent = "✅ Valid: Panjang nama memenuhi syarat minimal (" + val.length + " karakter).";
        demoExpNamaPesan.className = "feedback-box feedback-success";
      }
    });
  }

  // =================================================================
  // EKSPERIMEN MANDIRI 3: EVENT CHANGE DROPDOWN DEMO
  // =================================================================
  const demoExpSesi = document.getElementById("demoExpSesi");
  const demoExpSesiResult = document.getElementById("demoExpSesiResult");

  if (demoExpSesi && demoExpSesiResult) {
    demoExpSesi.addEventListener("change", function () {
      if (demoExpSesi.value === "") {
        demoExpSesiResult.textContent = "Belum ada sesi yang dipilih.";
        demoExpSesiResult.className = "feedback-box feedback-info";
      } else {
        demoExpSesiResult.textContent = "🎯 Event 'change' terdeteksi! Sesi aktif: " + demoExpSesi.value;
        demoExpSesiResult.className = "feedback-box feedback-success";
      }
    });
  }

  // =================================================================
  // EKSPERIMEN MANDIRI 4: TOGGLE VISIBILITAS PARAGRAF VIA CSS CLASS
  // =================================================================
  const btnToggleVisibilitas = document.getElementById("btnToggleVisibilitas");
  const paragrafRahasia = document.getElementById("paragrafRahasia");

  if (btnToggleVisibilitas && paragrafRahasia) {
    btnToggleVisibilitas.addEventListener("click", function () {
      paragrafRahasia.classList.toggle("hidden-element");
      if (paragrafRahasia.classList.contains("hidden-element")) {
        btnToggleVisibilitas.innerHTML = "<span>👁️</span> Tampilkan Paragraf";
      } else {
        btnToggleVisibilitas.innerHTML = "<span>🙈</span> Sembunyikan Paragraf";
      }
    });
  }

  // =================================================================
  // AUTOMATED STATE RUNNER (URL QUERY PARAMS)
  // Untuk pengujian otomatis, demonstrasi dosen, dan screenshotting
  // =================================================================
  const urlParams = new URLSearchParams(window.location.search);
  const activeTab = urlParams.get("tab");
  const action = urlParams.get("action");

  if (activeTab) {
    const targetBtn = document.querySelector(`[data-tab="${activeTab}"]`);
    if (targetBtn) targetBtn.click();
  }

  if (action === "click-aksi") {
    if (tombolAksi) tombolAksi.click();
  } else if (action === "toggle-gaya") {
    if (tombolGaya) tombolGaya.click();
  } else if (action === "input-counter") {
    if (namaInput) {
      namaInput.value = "Margent Ouwen Sitompul (312510463)";
      namaInput.dispatchEvent(new Event("input"));
    }
  } else if (action === "form-invalid-email") {
    document.getElementById("nama").value = "Margent Ouwen";
    document.getElementById("email").value = "margent_bukan_email";
    document.getElementById("usia").value = "21";
    form.requestSubmit();
  } else if (action === "form-invalid-age") {
    document.getElementById("nama").value = "Margent Ouwen";
    document.getElementById("email").value = "margent@student.ac.id";
    document.getElementById("usia").value = "15";
    form.requestSubmit();
  } else if (action === "form-valid") {
    document.getElementById("nama").value = "Margent Ouwen Sitompul";
    document.getElementById("email").value = "margent.ouwen@student.ac.id";
    document.getElementById("usia").value = "21";
    form.requestSubmit();
  } else if (action === "todo-done") {
    const firstSelesai = document.querySelector("#daftarTugas .btn-secondary");
    if (firstSelesai) firstSelesai.click();
  } else if (action === "workshop-valid") {
    const wsTab = document.querySelector('[data-tab="tab-miniproject"]');
    if (wsTab) wsTab.click();
    if (wsNama) {
      wsNama.value = "Margent Ouwen Sitompul";
      wsNama.dispatchEvent(new Event("input"));
    }
    if (wsEmail) {
      wsEmail.value = "margent.ouwen@student.ac.id";
      wsEmail.dispatchEvent(new Event("input"));
    }
    if (wsSesi) {
      wsSesi.value = "sesi-dom";
      wsSesi.dispatchEvent(new Event("change"));
    }
    if (wsKategori) {
      wsKategori.value = "Mahasiswa";
      wsKategori.dispatchEvent(new Event("change"));
    }
    if (wsCatatan) {
      wsCatatan.value = "Ingin menguasai JavaScript DOM tingkat mahir dan pembuatan web app interaktif.";
      wsCatatan.dispatchEvent(new Event("input"));
    }
    if (formWorkshop) {
      formWorkshop.requestSubmit();
    }
  } else if (action === "workshop-invalid") {
    const wsTab = document.querySelector('[data-tab="tab-miniproject"]');
    if (wsTab) wsTab.click();
    if (wsNama) {
      wsNama.value = "Ma"; // < 3 karakter
      wsNama.dispatchEvent(new Event("input"));
    }
    if (wsEmail) {
      wsEmail.value = "bukan-email";
      wsEmail.dispatchEvent(new Event("input"));
    }
    if (formWorkshop) {
      formWorkshop.requestSubmit();
    }
  }
});
