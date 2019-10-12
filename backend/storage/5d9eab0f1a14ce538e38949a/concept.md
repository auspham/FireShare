# Concept

### Number represent

```c
octo(8) = 0number;
hexa(16) = 0xnumberstring;
```

ex:

int n1 = 020;

// indicate octo system

0*8^0 = 0;

2*8^1 = 16;

=> 16.



int n2 = 0x2a;

a = 10

10 + 2*16^1 = 26

## Algorithmic:

| numeric                                                      | symbolic                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Correct                                                      | Correct                                                      |
| Straightforward to implement                                 | Straightforward to implement                                 |
| Efficient in terms of **memory and time.**                   | Efficient in terms of **memory and time.**                   |
| Effective, in that **yield correct answers** and have **broad applicability and/or limited restrictions on use.** | (for **massive** data) Scalable and/or parallelizable        |
| (For **approximations**) **Stable and reliable** in terms of the underlying arithmetic being performed. | (For simulations) **Statistical confidence** in answers and in the assumptions made. |

## C Preprocessor

`#` <~ symbolic substitution

conditional compilation

`#ifdef`

`#if`

`#else`

`#endif`



# Debugger

`gdb` : line by line

`grpof` : show run time



str-‘0' = number