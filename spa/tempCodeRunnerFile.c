void main(){

int num;
int *iptr = &num;
for (*iptr = 10; iptr; (*iptr)--){
printf("%d", *iptr);

}
}