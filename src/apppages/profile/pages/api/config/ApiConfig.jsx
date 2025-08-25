// prettier-ignore
/* eslint-disable */
import React from "react";
import { VAR_SOCIAL_LINKS } from "@vars";

/**
 * Данные языков программирования
 */
export const languagesData = ["Python", "Js", "C#", "C++", "Java", "Php"];

/**
 * Конфиг
 */
export const dataCodeLanguagesExampleApi = {
    Java: `import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class main {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://easyliker.ru/api");

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");

            connection.setDoOutput(true);
            connection.setDoInput(true);

            String token = "Ваш API ключ";
            String jsonInputString = "{\\"api_token\\": \\"" + token + "\\", \\"method\\": \\"getBalance\\", \\"version\\": 2.0}";

            try (OutputStream outputStream = connection.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                outputStream.write(input, 0, input.length);
            }

            int responseCode = connection.getResponseCode();
            BufferedReader reader;
            if (responseCode == HttpURLConnection.HTTP_OK) {
                reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            } else {
                reader = new BufferedReader(new InputStreamReader(connection.getErrorStream()));
            }

            String line;
            StringBuilder response = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            System.out.println(response.toString());

            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`,
    ["C++"]: `#include <iostream>
#include <curl/curl.h>
#include <string>

int main() {
    CURL* curl;
    CURLcode res;

    struct curl_slist* headers = NULL;
    headers = curl_slist_append(headers, "Content-type: application/json");

    std::string token = "Ваш API ключ";
    std::string requestJson = R"({"api_token": ")" + token + R"(", "method": "getBalance", "version": 2.0})";

    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();

    if (curl) {
        curl_easy_setopt(curl, CURLOPT_URL, "https://easyliker.ru/api");

        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, requestJson.c_str());

        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        res = curl_easy_perform(curl);

        if (res != CURLE_OK) {
            std::cerr << "Failed to perform request: " << curl_easy_strerror(res) << std::endl;
        }

        curl_easy_cleanup(curl);

        curl_global_cleanup();
    }

    curl_slist_free_all(headers);

    return 0;
}`,
    ["C#"]: `using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        string apiUrl = "https://easyliker.ru/api";
        string token = "Ваш API ключ";

        // Create the request object
        var requestData = new
        {
            api_token = token,
            method = "getBalance",
            version = 2.0
        };

        var httpClient = new HttpClient();

        var content = new StringContent(
          Newtonsoft.Json.JsonConvert.
          SerializeObject(requestData),
          Encoding.UTF8,
          "application/json"
        );

        var response = await httpClient.PostAsync(apiUrl, content);

        string responseContent =
        await response.Content.ReadAsStringAsync();

        dynamic responseObject = Newtonsoft.Json.JsonConvert.
        DeserializeObject(responseContent);

        Console.WriteLine(responseObject);
    }
}`,
    Go: `package main

import (
    "bytes"
    "encoding/json"
    fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    url := "https://easyliker.ru/api"
    token := "Ваш API ключ"

    data := map[string]interface{}{
        "api_token": token,
        "method": "getBalance",
        "version": 2.0,
    }

    jsonData, _ := json.Marshal(data)

    request, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    request.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    response, _ := client.Do(request)
    defer response.Body.Close()

    body, _ := ioutil.ReadAll(response.Body)

    fmt.Println(string(body))
}`,
    Php: `<?php

$token = "Ваш API ключ";
$parameters = array(
    "api_token" => $token,
    "method" => "getBalance",
    "version" => 2.0
);
$request_json = json_encode($parameters);

$headers = array(
    "Content-type: application/json"
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://easyliker.ru/api");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $request_json);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

curl_close($ch);

echo $response;
?>`,
    Python: `import requests


headers = {"Content-type": "application/json"}

token = "Ваш API ключ"
parameters = {"api_token": token, "method": "getBalance", "version": 2.0}

response = requests.post("https://easyliker.ru/api", json=parameters, headers=headers)
print(response.json())

#Вывод {"response": 372.59}`,
    Js: `const axios = require('axios');

const token = 'Ваш API ключ';

axios.post('https://easyliker.ru/api', {
  api_token: token,
  method: 'getBalance',
  version: 2.0
}, {
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });`,
};

/**
 * Конфиг api методов
 */
export const configApiDocs = {
    my_api_key: {
        name: "Ваш API ключ",
        nameDocs: "Ваш API ключ",
    },
    call_methods_api: {
        name: "Вызов методов API",
        nameDocs: "Вызов методов API",
    },
    example_api: {
        name: "Пример API",
        nameDocs: "Пример API",
    },
    getBalance: {
        dataParamsQuery: [
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        api_token <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),
                description: <p className="text-base font-pn-regular text-gray-600">Токен авторизации</p>,
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        method <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),

                description: <p className="text-base font-pn-regular text-gray-600">Метод запроса</p>,
            },
            {
                description: (
                    <p className="text-base font-pn-regular text-gray-600">
                        Номер версии api. Текущая версия 2.0
                        <br /> Если не передан, то используется текущая версия
                    </p>
                ),
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        version <span className="text-primary-500">float</span>
                    </p>
                ),
            },
        ],
        dataErrors: [
            {
                param: <p className="text-base font-pn-semibold">MISSING_PARAMETER</p>,
                description: "Переданы не все параметры",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_API_TOKEN</p>,
                description: "Нерабочий API ключ",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_VERSION</p>,
                description: "Неверная версии api",
            },
            {
                param: <p className="text-base font-pn-semibold">API_TOKEN_DISABLED</p>,
                description: "Взаимодействие с API ключом выключено",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_METHOD</p>,
                description: "Неверный метод",
            },
        ],
        subtitle: "Получение текущего баланса аккаунта",
        successResponse: `{
    response: 10353.06
}`,
        name: "Метод getBalance",
        nameDocs: "Получение баланса",
    },
    getServiceVersion: {
        dataParamsQuery: [
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        api_token <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),
                description: <p className="text-base font-pn-regular text-gray-600">Токен авторизации</p>,
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        method <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),

                description: <p className="text-base font-pn-regular text-gray-600">Метод запроса</p>,
            },
            {
                description: (
                    <p className="text-base font-pn-regular text-gray-600">
                        Номер версии api. Текущая версия 2.0
                        <br /> Если не передан, то используется текущая версия
                    </p>
                ),
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        version <span className="text-primary-500">float</span>
                    </p>
                ),
            },
        ],
        dataErrors: [
            {
                param: <p className="text-base font-pn-semibold ">MISSING_PARAMETER</p>,
                description: "Переданы не все параметры",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_API_TOKEN</p>,
                description: "Нерабочий API ключ",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_VERSION</p>,
                description: "Неверная версии api",
            },
            {
                param: <p className="text-base font-pn-semibold ">API_TOKEN_DISABLED</p>,
                description: "Взаимодействие с API ключом выключено",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_METHOD</p>,
                description: "Неверный метод",
            },
        ],
        subtitle: "Получения текущей версии тарифов",
        successResponse: `{
    response: 2.134
}`,
        name: "Метод getServiceVersion",
        nameDocs: "Текущая версия услуг",
    },
    getServices: {
        dataParamsQuery: [
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        api_token <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),
                description: <p className="text-base font-pn-regular text-gray-600">Токен авторизации</p>,
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        method <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),

                description: <p className="text-base font-pn-regular text-gray-600">Метод запроса</p>,
            },
            {
                description: (
                    <p className="text-base font-pn-regular text-gray-600">
                        Номер версии api. Текущая версия 2.0
                        <br /> Если не передан, то используется текущая версия
                    </p>
                ),
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        version <span className="text-primary-500">float</span>
                    </p>
                ),
            },
        ],
        dataErrors: [
            {
                param: <p className="text-base font-pn-semibold ">MISSING_PARAMETER</p>,
                description: "Переданы не все параметры",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_API_TOKEN</p>,
                description: "Нерабочий API ключ",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_VERSION</p>,
                description: "Неверная версии api",
            },
            {
                param: <p className="text-base font-pn-semibold ">API_TOKEN_DISABLED</p>,
                description: "Взаимодействие с API ключом выключено",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_METHOD</p>,
                description: "Неверный метод",
            },
        ],
        successResponse: `{
    response:
    {
            vk: {..}
            youtube: {..}
            telegram: {..}
            instagram: {..}
            tiktok: {..}
            twitch: {..}
            twitter: {..}
    }
}`,
        subtitle: "Возвращает словарь со всеми сервисами",
        name: "Метод getServices",
        nameDocs: "Данные об услугах",
    },
    createTask: {
        dataParamsQuery: [
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        api_token <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),
                description: <p className="text-base font-pn-regular text-gray-600">Токен авторизации</p>,
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        method <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),

                description: <p className="text-base font-pn-regular text-gray-600">Метод запроса</p>,
            },
            {
                description: (
                    <p className="text-base font-pn-regular text-gray-600">
                        Номер версии api. Текущая версия 2.0
                        <br /> Если не передан, то используется текущая версия
                    </p>
                ),
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        version <span className="text-primary-500">float</span>
                    </p>
                ),
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        website <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),

                description: (
                    <p className="text-base font-pn-regular text-gray-600">
                        Соц. сеть, актуальный список можно получить вызвав метод getServices
                    </p>
                ),
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        type <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),

                description: (
                    <p className="text-base font-pn-regular text-gray-600">
                        Тип накрута, актуальный список можно получить вызвав метод getServices
                    </p>
                ),
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        quality <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),

                description: (
                    <p className="text-base font-pn-regular text-gray-600">
                        Качество, актуальный список можно получить вызвав метод getServices
                    </p>
                ),
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        link <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),

                description: <p className="text-base font-pn-regular text-gray-600">Ссылка на объект задания</p>,
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        count <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),

                description: <p className="text-base font-pn-regular text-gray-600">Количество</p>,
            },
            {
                description: (
                    <p className="text-base font-pn-regular text-gray-600">
                        Массив вариантов комментариев/номер(-а) голосования, если не передан, то используются стандартные комментарии в
                        зависимости от типа и качества услуги
                    </p>
                ),

                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        option <span className="text-primary-500">array of objects/integers</span>
                    </p>
                ),
            },
        ],
        dataErrors: [
            {
                param: <p className="text-base font-pn-semibold ">BALANCE_TOO_LOW</p>,
                description: "Недостаточно средств",
            },
            {
                param: <p className="text-base font-pn-semibold ">COUNT_FOR_THIS_ORDER_TOO_LOW</p>,
                description: "Количество ниже минимального",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_AMOUNT_OF_ORDER</p>,
                description: "Цена заказа ниже допустимого",
            },
            {
                param: <p className="text-base font-pn-semibold ">TEMPORARILY_UNAVAILABLE</p>,
                description: "Услуга временно недоступна",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_COUNT</p>,
                description: "Неверное количество",
            },
            {
                param: <p className="text-base font-pn-semibold ">MISSING_PARAMETER</p>,
                description: "Переданы не все параметры",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_API_TOKEN</p>,
                description: "Нерабочий API ключ",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_VERSION</p>,
                description: "Неверная версии api",
            },
            {
                param: <p className="text-base font-pn-semibold ">API_TOKEN_DISABLED</p>,
                description: "Взаимодействие с API ключом выключено",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_METHOD</p>,
                description: "Неверный метод",
            },
        ],
        successResponse: `{
    response:
    [{
        id: 100,
        link: "https://vk.com/id1",
        start: 51,
        count: 1450,
        done: 941,
        sum: 139.50,
        name: "VK друзья | офферы, низкое качество",
        status: "Выполняется",
        date: "05.06.2021 | 15:37:03",
        creation_date: "2021-06-05T15:37:031847Z",
        cancellation_reason: "Скрытый контент/Закрытый аккаунт" #Может быть у отмененных и частично выполненных заказах
    }]
}`,
        subtitle: "Создание нового задания",
        name: "Метод createTask",
        nameDocs: "Создание заказа",
    },
    getTasks: {
        dataParamsQuery: [
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        api_token <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),
                description: <p className="text-base font-pn-regular text-gray-600">Токен авторизации</p>,
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        method <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),

                description: <p className="text-base font-pn-regular text-gray-600">Метод запроса</p>,
            },
            {
                description: (
                    <p className="text-base font-pn-regular text-gray-600">
                        Номер версии api. Текущая версия 2.0
                        <br /> Если не передан, то используется текущая версия
                    </p>
                ),
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        version <span className="text-primary-500">float</span>
                    </p>
                ),
            },
            {
                description: (
                    <p className="text-base font-pn-regular text-gray-600">
                        Номер заказа. В ответе будет один заказ в массиве. Если не передан, то вернется count последних заказов
                    </p>
                ),
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        id <span className="text-primary-500">integer</span>
                    </p>
                ),
            },
            {
                description: (
                    <p className="text-base font-pn-regular text-gray-600">
                        Номера заказов, до 20 штук за раз. В ответе будет массив с информацией о всех переданных заказах
                    </p>
                ),
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        ids <span className="text-primary-500">array of integers</span>
                    </p>
                ),
            },
            {
                description: (
                    <p className="text-base font-pn-regular text-gray-600">
                        Количество заказов, которые вернет сервер сортируя от новых к старым. По умолчанию 20
                    </p>
                ),
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        count <span className="text-primary-500">integer</span>
                    </p>
                ),
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        offset <span className="text-primary-500">integer</span>
                    </p>
                ),
                description: <p className="text-base font-pn-regular text-gray-600">Смещение по вашим заказам. По умолчанию 0</p>,
            },
        ],
        dataErrors: [
            {
                param: <p className="text-base font-pn-semibold ">ORDER_ID_ERROR</p>,
                description: "Неверный id заказа",
            },
            {
                param: <p className="text-base font-pn-semibold ">MISSING_PARAMETER</p>,
                description: "Переданы не все параметры",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_API_TOKEN</p>,
                description: "Нерабочий API ключ",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_VERSION</p>,
                description: "Неверная версии api",
            },
            {
                param: <p className="text-base font-pn-semibold ">API_TOKEN_DISABLED</p>,
                description: "Взаимодействие с API ключом выключено",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_METHOD</p>,
                description: "Неверный метод",
            },
        ],
        successResponse: `{
      response:
      [{
            id: 100,
            link: "https://vk.com/id1",
            price: 120.33,
            price_per_one: 0.1,
            start: 51,
            balance: 1030.20,
            name: "VK друзья | офферы, низкое качество",
            status: "Выполняется",
            creation_date: "2021-06-05T21:01:59.631847Z"
            cancellation_reason: "Скрытый контент/Закрытый аккаунт" #Может быть
            у отмененных и частично выполненных заказах
      }]
}`,
        subtitle: "Получение массива заданий",
        name: "Метод getTasks",
        nameDocs: "История заказов",
    },
    getPaymentMethods: {
        dataParamsQuery: [
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        api_token <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),
                description: <p className="text-base font-pn-regular text-gray-600">Токен авторизации</p>,
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        method <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),

                description: <p className="text-base font-pn-regular text-gray-600">Метод запроса</p>,
            },
            {
                description: (
                    <p className="text-base font-pn-regular text-gray-600">
                        Номер версии api. Текущая версия 2.0
                        <br /> Если не передан, то используется текущая версия
                    </p>
                ),
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        version <span className="text-primary-500">float</span>
                    </p>
                ),
            },
        ],
        dataErrors: [
            {
                param: <p className="text-base font-pn-semibold ">MISSING_PARAMETER</p>,
                description: "Переданы не все параметры",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_API_TOKEN</p>,
                description: "Нерабочий API ключ",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_VERSION</p>,
                description: "Неверная версии api",
            },
            {
                param: <p className="text-base font-pn-semibold ">API_TOKEN_DISABLED</p>,
                description: "Взаимодействие с API ключом выключено",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_METHOD</p>,
                description: "Неверный метод",
            },
        ],
        successResponse: `{
      response: ["qiwi", "youmoney", "card"]
}`,
        subtitle: "Возвращает массив с доступными методами пополнения",
        name: "Метод getPaymentMethods",
        nameDocs: "Способы пополнения",
    },
    createPayment: {
        dataParamsQuery: [
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        api_token <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),
                description: <p className="text-base font-pn-regular text-gray-600">Токен авторизации</p>,
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        method <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),

                description: <p className="text-base font-pn-regular text-gray-600">Метод запроса</p>,
            },
            {
                description: (
                    <p className="text-base font-pn-regular text-gray-600">
                        Номер версии api. Текущая версия 2.0
                        <br /> Если не передан, то используется текущая версия
                    </p>
                ),
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        version <span className="text-primary-500">float</span>
                    </p>
                ),
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        sum <span className="text-primary-500">float</span>
                    </p>
                ),
                description: <p className="text-base font-pn-regular text-gray-600">Сумма пополнения</p>,
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        payment_system <span className="text-primary-500">string</span>
                    </p>
                ),
                description: <p className="text-base font-pn-regular text-gray-600">Способ пополнения</p>,
            },
        ],
        dataErrors: [
            {
                param: <p className="text-base font-pn-semibold ">PAYMENT_ID_ERROR</p>,
                description: "Неверный id заказа",
            },
            {
                param: <p className="text-base font-pn-semibold ">MISSING_PARAMETER</p>,
                description: "Переданы не все параметры",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_API_TOKEN</p>,
                description: "Нерабочий API ключ",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_VERSION</p>,
                description: "Неверная версии api",
            },
            {
                param: <p className="text-base font-pn-semibold ">API_TOKEN_DISABLED</p>,
                description: "Взаимодействие с API ключом выключено",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_METHOD</p>,
                description: "Неверный метод",
            },
        ],
        successResponse: `{
    response:
    [{
        redirect_to: "qiwi.com/",
        number: 79997775050,
        comment: "EL7356",
        sum: 100
    }]
}`,
        name: "Метод createPayment",
        nameDocs: "Создать платеж",
        subtitle: "Создать платеж",
    },
    getPayment: {
        dataParamsQuery: [
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        api_token <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),
                description: <p className="text-base font-pn-regular text-gray-600">Токен авторизации</p>,
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        method <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),

                description: <p className="text-base font-pn-regular text-gray-600">Метод запроса</p>,
            },
            {
                description: (
                    <p className="text-base font-pn-regular text-gray-600">
                        Номер версии api. Текущая версия 2.0
                        <br /> Если не передан, то используется текущая версия
                    </p>
                ),
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        version <span className="text-primary-500">float</span>
                    </p>
                ),
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        id <span className="text-primary-500">integer</span>
                    </p>
                ),
                description: <p className="text-base font-pn-regular text-gray-600">Номер платежа</p>,
            },
        ],
        dataErrors: [
            {
                param: <p className="text-base font-pn-semibold ">PAYMENT_ID_ERROR</p>,
                description: "Неверный id заказа",
            },
            {
                param: <p className="text-base font-pn-semibold ">MISSING_PARAMETER</p>,
                description: "Переданы не все параметры",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_API_TOKEN</p>,
                description: "Нерабочий API ключ",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_VERSION</p>,
                description: "Неверная версии api",
            },
            {
                param: <p className="text-base font-pn-semibold ">API_TOKEN_DISABLED</p>,
                description: "Взаимодействие с API ключом выключено",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_METHOD</p>,
                description: "Неверный метод",
            },
        ],
        successResponse: `{
    response:
    [{
        id: 60120,
        sum: 100.50,
        link: "https://yoomoney.ru/checkout/payments/v2/contract?orderId=2979c2f8-000f-5000-a000-1a8ef180704c", #Ссылка для оплаты
        is_paid: True, #Оплачен ли счет
        selected_payment_system: "apple_pay",
        creation_date: "2021-06-05T15:37:031847Z",
        number_to_pay: 0, #Только для прямых переводов
        comment: "EL60120" #Только для прямых переводов, иначе None
    }]
}`,
        subtitle: "Получение данных о платеже",
        name: "Метод getPayment",
        nameDocs: "Данные о платеже",
    },
    getProfileData: {
        dataParamsQuery: [
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        api_token <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),
                description: <p className="text-base font-pn-regular text-gray-600">Токен авторизации</p>,
            },
            {
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        method <span className="text-primary-500">string</span>
                        <span className="text-orange-400">, обязательно</span>
                    </p>
                ),

                description: <p className="text-base font-pn-regular text-gray-600">Метод запроса</p>,
            },
            {
                description: (
                    <p className="text-base font-pn-regular text-gray-600">
                        Номер версии api. Текущая версия 2.0
                        <br /> Если не передан, то используется текущая версия
                    </p>
                ),
                param: (
                    <p className="text-base font-pn-semibold text-gray-600">
                        version <span className="text-primary-500">float</span>
                    </p>
                ),
            },
        ],
        dataErrors: [
            {
                param: <p className="text-base font-pn-semibold ">PAYMENT_ID_ERROR</p>,
                description: "Неверный id заказа",
            },
            {
                param: <p className="text-base font-pn-semibold ">MISSING_PARAMETER</p>,
                description: "Переданы не все параметры",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_API_TOKEN</p>,
                description: "Нерабочий API ключ",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_VERSION</p>,
                description: "Неверная версии api",
            },
            {
                param: <p className="text-base font-pn-semibold ">API_TOKEN_DISABLED</p>,
                description: "Взаимодействие с API ключом выключено",
            },
            {
                param: <p className="text-base font-pn-semibold ">INVALID_METHOD</p>,
                description: "Неверный метод",
            },
        ],
        successResponse: `{
    response:
    {
        balance: 1024.71
        email: ${VAR_SOCIAL_LINKS.email}
        orders: 341
        referrals: 23
        active_referrals: 17
        total_earned: 3213.66
        referral_code: FREE
        mail_is_confirmed: True
        total_spent: 22321.13
        payments: 131
    }
}`,
        subtitle: "Возвращает более подробную информацию об аккаунте",
        name: "Метод getProfileData",
        nameDocs: "Информация об аккаунте",
    },
};
