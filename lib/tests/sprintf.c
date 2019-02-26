#include <stdio.h>

int main(int argc, char *argv[])
{
    for (int i = 0; i <= 10; i++) {
        printf("%*chello %s\n", i, ' ', argc > 1? argv[1] : "world");
    }
}
