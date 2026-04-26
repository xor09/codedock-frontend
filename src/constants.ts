export const TEMPLATES: Record<string, string> = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    string s;
    while (getline(cin, s)) {
        cout << s << "\\n";
    }
    return 0;
}`,
  java: `import java.io.*;
import java.util.*;

class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }
    }
}`,
  python: `# Python 3
import sys

for line in sys.stdin:
    print(line.strip())`,
};


interface IToastColor {
  success: string,
  danger: string,
  info: string,
  warning: string
}

export const TOAST_COLOR: IToastColor = {
  success: "#00e066",
  danger: "#ef4444",
  info: "#38bdf8",
  warning: "#e0d50fff"
} 