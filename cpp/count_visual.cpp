#include <bits/stdc++.h>
using namespace std;

int main() {
	int N; cin >> N;
	for(int x = 0; x <= N; x++) {
		for(int y = 0; y <= N; y++) {
			int tx = x, ty = y;
			bool works = true;
			while(tx > 0 || ty > 0) {
				if(((tx % 3) % 2) != ((ty % 3) % 2)) {
					works = false;
					break;
				}
				tx /= 3;
				ty /= 3;
			}
			if(works) cout << 'X';
			else cout << '.';
		}
		cout << '\n';
	}
}
