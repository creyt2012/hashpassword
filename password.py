import string
import random
import time
from tqdm import tqdm

def generate_random_string(length, characters):
    return ''.join(random.choice(characters) for _ in range(length))

def write_to_file(file_path, data):
    with open(file_path, 'a') as file:
        file.write(data + '\n')

def main():
    hash_length = 6
    file_path = '/Users/development/Documents/data/dataset.txt'

    password_characters = string.ascii_letters + string.digits + string.punctuation

    strings_per_second = 1000

    existing_hashes = set()
    total_strings = len(password_characters) ** hash_length

    with tqdm(total=total_strings, desc="Progress", unit="strings") as pbar:
        start_time = time.time()

        while len(existing_hashes) < total_strings:
            random_string = generate_random_string(hash_length, password_characters)

            if random_string not in existing_hashes:
                existing_hashes.add(random_string)
                write_to_file(file_path, random_string)
            elapsed_time = time.time() - start_time
            time_to_sleep = max(0, 1/strings_per_second - elapsed_time)
            time.sleep(time_to_sleep)

            pbar.update(1)  

    print("Hoàn thành tạo và lưu trữ tất cả các password.")

if __name__ == "__main__":
    main()
