import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function FaqSeeder() {
  try {
    // Create new sponsor record
    await prisma.faq.create({
      data: {
        question: "Bagaimana cara mendaftar?",
        questionEn: "How to register?",
        answer: "Buat akun terlebih dahulu pada halaman Register. Kemudian Login dan lakukan pendaftaran pada halaman dashboard anda dengan memilih salah satu kategori lari yang ingin anda ikuti.",
        answerEn: "First, create an account on the Register page.Then Login and do",
      },
    });

    await prisma.faq.create({
      data: {
        question: "Apa yang harus dilakukan setelah mendaftar?",
        questionEn: "What should I do after register?",
        answer: "Setelah anda berhasil mendaftar, anda akan mendapatkan invoice yang harus anda bayarkan. Link tautan pembayaran berada pada halaman dashboard akun anda.",
        answerEn: "After you successfully register, you will get an invoice that you have to pay. The payment link is on your account dashboard page.",
      },
    });

    await prisma.faq.create({
      data: {
        question: " Bagaimana cara saya melakukan pembayaran?",
        questionEn: "How do I make a payment?",
        answer: "Anda dapat melakukan pembayaran melalui transfer bank ke nomor rekening yang tertera pada invoice anda. Setelah melakukan pembayaran, anda harus mengunggah bukti pembayaran pada halaman dashboard akun anda.",
        answerEn: "You can make a payment via bank transfer to the account number listed on your invoice. After making a payment, you have to upload the payment proof on your account dashboard page.",
      },
    });

    await prisma.faq.create({
      data: {
        question: "Setelah pembayaran apa yang harus saya lakukan?",
        questionEn: "What should I do after payment?",
        answer:
          "Jika anda sudah berhasil melakukan pembayaran maka status dari invoice anda akan berubah menjadi 'Pembayaran Berhasil'. Anda dapat megunduh kartu perserta yang dapat anda tukarkan dengan racepack dan jersey di loket pendaftaran.",
        answerEn: 'If you have successfully made a payment then the status of your invoice will change to "Payment Successful". You can download the participant card which you can exchange for racepack and jersey at the registration desk.',
      },
    });

    console.log("Faq seeded successfully!");
  } catch (error) {
    console.error("Error seeding faq:", error);
  }
}
