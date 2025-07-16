
#include <stdio.h> 
#include <stdlib.h> 
#include <time.h> 
  
// fungsi untuk membuat nama acak 
void randomName(int len) 
{ 
    char consonant[] = {'b', 'c', 'd', 'f', 'g', 'h', 'j', 
                       'k', 'l', 'm', 'n', 'p', 'r', 's', 
                       't', 'v', 'w', 'x', 'z'}; 
  
    char vocal[] = {'a', 'e', 'i', 'o', 'u'}; 
  
    srand(time(NULL)); 
    int i; 
    for (i = 0; i < len; i++) { 
  
        // pilih nada vokal atau konsonan 
        if (i % 2 == 0) 
            printf("%c", consonant[rand() % 19]); 
        else
            printf("%c", vocal[rand() % 5]); 
    } 
} 
  
// driver program 
int main() 
{ 
    int panjang = 7; 
  
    randomName(panjang); 
    return 0; 
}