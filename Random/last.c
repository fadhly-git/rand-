#include <string.h>
#include <stdio.h>

void enkripsiCaesar();
void Euclidean();

int main() {
    int pilih=0;
    while (pilih != 3)
    {
        printf("\n\t\t--------------\t\t\n");
        printf("|\tMENU APLIKASI\t\t\t|\n");
        printf("|\t1.Caesar Chiper\t\t\t|\n");
        printf("|\t2.Euclidean\t\t\t|\n");
        printf("|\t3.Selesai....\t\t\t|\n");
        printf("PILIH [1-3] : ");scanf(" %d",&pilih);
        if (pilih == 1)
        { 
            char caesar;
            printf("tekan e jika anda ingin mengenkripsi\ntekan d jika anda ingin mendeskripsi\n---==>>");scanf(" %c",&caesar);
            if (caesar == 'e')
            {
                enkripsiCaesar();
            }else if (caesar == 'd')
            {
                decryptCaesar();
                //endif
            }
            
        }
        else if (pilih == 2)
        {
            Euclidean();
        }
        else if (pilih == 3)
        {
            /* code */
            printf("Selesai...");
        //endif
        }
        
        
    //endwhile
    }
    
}

//procedure enkripsi caesar chiper
void enkripsiCaesar(){
    char kalimat[100], hasil[100];
    int key, i;

    printf("Masukkan kalimat: ");
    scanf(" %s", &kalimat);

    printf("Masukkan key: ");
    scanf(" %d", &key);

    for (i = 0; i < strlen(kalimat); i++) {
        if (kalimat[i] >= 'a' && kalimat[i] <= 'z') {
            hasil[i] = ((kalimat[i] + key - 'a') % 26) + 'a';
        } else if (kalimat[i] >= 'A' && kalimat[i] <= 'Z') {
            hasil[i] = ((kalimat[i] + key - 'A') % 26) + 'A';
        } else {
            hasil[i] = kalimat[i];
        }
    }
    
    hasil[i] = '\0';
    printf("Hasil enkripsi: %s\n", hasil);
//endprocedur enkripsi caesarChiper
}

//procedure deksripsi caesarChiper
void decryptCaesar()
{
    char str[50];
    int i, key;

    printf("Masukkan Kalimat: ");
    scanf(" %s", &str);
    printf("Masukkan Kunci (angka): ");
    scanf("%d", &key);

    for(i = 0; str[i] != '\0'; ++i) {
        char kar = str[i];

        // Jika karakter adalah huruf kecil
        if (kar >= 'a' && kar <= 'z') {
            kar = kar - key;

            // Jika karakter di bawah 'a',
            // tambahkan 26 untuk membuatnya kembali
            // ke posisi awal
            if (kar < 'a') {
                kar = kar + 'z' - 'a' + 1;
            }

            str[i] = kar;
        }

        // Jika karakter adalah huruf besar
        else if (kar >= 'A' && kar <= 'Z') {
            kar = kar - key;

            // Jika karakter di bawah 'A',
            // tambahkan 26 untuk membuatnya kembali
            // ke posisi awal
            if (kar < 'A') {
                kar = kar + 'Z' - 'A' + 1;
            }

            str[i] = kar;
        }
    }

    printf("Deskripsi Kalimat: %s", str);
}
//endprocedure deskripsiCaesarChiper



//procedure Euclidean
void Euclidean(){

    int a, b, r, q, x, y;

    printf("Masukkan angka pertama: ");
    scanf("%d",&a);
    printf("Masukkan angka kedua: ");
    scanf("%d",&b);

    x = a;
    y = b;

    while (b != 0)
    {
        r = a % b;
        q = a / b;
        a = b;
        b = r;
    }
    printf("FPB dari %d dan %d adalah %d\n",x, y, a);


}
